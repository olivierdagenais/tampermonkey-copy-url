import { SemVer } from "./SemVer";
import {Crumb} from "./Crumb";
import {JenkinsPage} from "./JenkinsPage";

const jenkins2_463 = SemVer.parse("2.463");
const DashboardCrumb = new Crumb("Dashboard", "/");

export class JenkinsHelpers {
    static buildUrl(
        urlString: string,
        newPath: string,
        queryString?: string
    ): string {
        const url = new URL(urlString);
        url.pathname = newPath;
        if (queryString) {
            url.search = queryString;
        }
        return url.toString();
    }

    static getBodyElement(doc: Document): HTMLElement | null {
        const bodyElement: HTMLElement | null = doc.querySelector(
            "html body[id=jenkins]"
        );
        return bodyElement;
    }

    static getBreadcrumbItemSelector(bodyElement: HTMLElement): string {
        const anchorContainers = [
            ".ch-section-1",
            ".jenkins-header__navigation",
            ".jenkins-breadcrumbs__list-item",
        ];
        let selector = anchorContainers.join(", ");
        const jenkinsVersion = bodyElement.getAttribute("data-version");
        switch (jenkinsVersion) {
            case "2.361.4":
                selector = ".jenkins-breadcrumbs .item";
                break;
        }
        return selector;
    }

    static parsePage(
        bodyElement: HTMLElement,
        urlString: string
    ) : JenkinsPage {
        const selector = this.getBreadcrumbItemSelector(bodyElement);
        const doc = bodyElement.ownerDocument;
        const anchorContainers = doc.querySelectorAll(selector);
        if (anchorContainers) {
            const crumbs: Crumb[] = [];
            for (let i = 0; i < anchorContainers.length; i++) {
                const anchorContainer = anchorContainers[i];
                const anchor = anchorContainer.querySelector("a");
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        const crumb1 = new Crumb(
                            anchorContainer.textContent,
                            path
                        );
                        crumbs.push(crumb1);
                    }
                    // I don't know what to do if we have an "a" without "href"
                }
                else {
                    // Jenkins around 2.528.3 stopped including an anchor
                    // for the last item in the breadcrumb, so use current path.
                    if (i == anchorContainers.length - 1) {
                        const url = new URL(urlString);
                        const crumb = new Crumb(
                            anchorContainer.textContent,
                            url.pathname
                        );
                        crumbs.push(crumb);
                    }
                }
            }
            return new JenkinsPage(
                urlString,
                crumbs,
                bodyElement,
            );
        }
        return new JenkinsPage(
            urlString,
            [DashboardCrumb],
            bodyElement,
        );
    }

    static getMostRecentRunSelector(bodyElement: HTMLElement): string {
        const jenkinsVersion = bodyElement.getAttribute("data-version");
        if (!jenkinsVersion) {
            throw new Error("I can't determine the Jenkins version!");
        }
        const jenkinsSemVer = SemVer.parse(jenkinsVersion);
        // jenkinsci/jenkins#9148: Rewrite the build history widget by
        // janfaracik
        // https://github.com/jenkinsci/jenkins/pull/9148
        if (jenkins2_463.compareTo(jenkinsSemVer) <= 0) {
            return "#jenkins-build-history a.app-builds-container__item__inner__link";
        }
        return "tr.build-row a.build-link";
    }

    static isInteger(s: string): boolean {
        return Number.isInteger(Number.parseInt(s, 10));
    }

    static splitPath(path: string): string[] {
        const numToTrim = path.endsWith("/") ? 1 : 0;
        const adjustedPath = path.substring(0, path.length - numToTrim);
        const pathParts = adjustedPath.split("/");
        return pathParts;
    }

    static splitUrlPath(urlString: string): string[] {
        const url = new URL(urlString);
        return this.splitPath(url.pathname);
    }
}
