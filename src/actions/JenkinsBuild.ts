import { JenkinsHelpers } from "../JenkinsHelpers";
import { Action } from "../Action";

export interface BuildableItem {
    blocked?: boolean;
    buildable?: boolean;
    stuck?: boolean;
}

export class JenkinsBuild implements Action {
    async perform(
        doc: Document,
        url: string,
        e: KeyboardEvent
    ): Promise<boolean> {
        const request = this.navigate(doc, url);
        if (request) {
            setTimeout(() => this.queueRun(request), 1 /*ms*/);
            return true;
        }
        return false;
    }

    static async createBuildableItem(
        response: Response
    ): Promise<BuildableItem> {
        const map: any = await response.json();
        const result: BuildableItem = {
            blocked: map.blocked,
            buildable: map.buildable,
            stuck: map.stuck,
        };
        return result;
    }

    navigate(doc: Document, url: string): Request | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const headElement = doc.querySelector(
            "head[data-crumb-header][data-crumb-value]"
        );
        if (!headElement) {
            return null;
        }
        const headerName = headElement.getAttribute("data-crumb-header");
        const headerValue = headElement.getAttribute("data-crumb-value");
        if (!headerName || !headerValue) {
            return null;
        }
        /* <a> elements with an href ending in "/build?delay=0sec" */
        const linkSelector = "a[href$='/build?delay=0sec']";
        const crumbSelector =
            JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const crumbListItems = doc.querySelectorAll(crumbSelector);
        if (bodyElement.querySelector(linkSelector)) {
            const index = crumbListItems.length - 1;
            const listItem = crumbListItems.item(index);
            const anchor = listItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    const destinationUrl = JenkinsHelpers.buildUrl(
                        url,
                        path + "build",
                        "delay=0sec"
                    );
                    return new Request(destinationUrl);
                }
            }
        } else {
            for (var index = crumbListItems.length - 1; index > 1; index--) {
                const item = crumbListItems.item(index);
                const anchor = item.querySelector("a");
                if (anchor) {
                    const href = anchor.getAttribute("href");
                    if (href) {
                        const hrefParts = JenkinsHelpers.splitPath(href);
                        if ("job" == hrefParts[hrefParts.length - 2]) {
                            const destinationUrl = JenkinsHelpers.buildUrl(
                                url,
                                href + "build",
                                "delay=0sec"
                            );
                            return new Request(destinationUrl);
                        }
                    }
                }
            }
        }

        return null;
    }

    queueRun(request: Request) {
        window.location.href = request.url;
    }
}
