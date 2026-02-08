import {Crumb} from "./Crumb";
import {JenkinsHelpers} from "./JenkinsHelpers";

export class JenkinsPage {
    readonly urlString: string;
    readonly urlParts: string[];
    readonly crumbs: Crumb[];
    readonly bodyElement: HTMLElement;

    constructor(
        urlString: string,
        crumbs: Crumb[],
        bodyElement: HTMLElement,
    ) {
        this.urlString = urlString;
        this.urlParts = JenkinsHelpers.splitUrlPath(urlString);
        this.crumbs = crumbs;
        this.bodyElement = bodyElement;
    }

    buildUrl(path: string, queryString?: string): string {
        return JenkinsHelpers.buildUrl(
            this.urlString,
            path,
            queryString
        );
    }

    eachCrumb(callback: (value: Crumb, key: number) => boolean): void {
        for (let key = 0; key < this.crumbs.length; key++) {
            const keepGoing = callback(this.crumbs[key], key);
            if (!keepGoing) {
                break;
            }
        }
    }

    firstCrumb(): Crumb {
        return this.crumbs[0];
    }

    lastCrumb(): Crumb {
        return this.crumbs[this.crumbs.length - 1];
    }

    pageOrRootAction(
        action: string,
    ): string | null {
        /* <a> elements with an href ending in /${action} */
        const selector = `a[href$='/${action}']`;
        let crumb: Crumb | null = null;
        if (1 == this.crumbs.length) {
            crumb = this.firstCrumb();
        }
        else if (this.bodyElement.querySelector(selector)) {
            crumb = this.lastCrumb();
        }
        if (crumb) {
            const path = crumb.href;
            return this.buildUrl(path + action);
        }
        return null;
    }

    penultimateCrumb() : Crumb {
        return this.crumbs[this.crumbs.length - 2];
    }

    reverseCrumb(callback: (value: Crumb, key: number) => boolean): void {
        for (let key = this.crumbs.length - 1; key > 0; key--) {
            const keepGoing = callback(this.crumbs[key], key);
            if (!keepGoing) {
                break;
            }
        }
    }

}
