import { JenkinsHelpers } from "../JenkinsHelpers";
import { Action } from "../Action";

export interface Executable {
    number?: number;
    url?: string;
}

export interface BuildableItem {
    blocked?: boolean;
    buildable?: boolean;
    stuck?: boolean;
    cancelled?: boolean;
    executable?: Executable;
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

    static async fetchBuildableItem(location: string): Promise<BuildableItem> {
        const request = new Request(location);
        const response = await fetch(request);
        const result = this.createBuildableItem(response);
        return result;
    }

    static async createBuildableItem(
        response: Response
    ): Promise<BuildableItem> {
        const map: any = await response.json();
        const result: BuildableItem = {
            blocked: map.blocked || false,
            buildable: map.buildable || false,
            stuck: map.stuck || false,
            cancelled: map.cancelled || false,
            executable: map.executable || null,
        };
        return result;
    }

    navigate(doc: Document, url: string): Request | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const headers: Headers = new Headers();
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
        headers.append(headerName, headerValue);

        const PostOptions: RequestInit = {
            method: "POST",
            credentials: "same-origin",
            headers: headers,
            mode: "same-origin",
            cache: "default",
        };

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
                    return new Request(destinationUrl, PostOptions);
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
                            return new Request(destinationUrl, PostOptions);
                        }
                    }
                }
            }
        }

        return null;
    }

    async queueRun(request: Request) {
        const response = await fetch(request);
        const locationBase = response.headers.get("Location");
        if (201 == response.status && locationBase) {
            // TODO: announce to user
            // locationBase looks like "http://localhost:8080/queue/item/18/"
            const location = locationBase + "api/json";
            for (let index = 0; index < 10; index++) {
                // TODO: should we wait _first_?
                const buildableItem = await JenkinsBuild.fetchBuildableItem(
                    location
                );
                if (buildableItem.cancelled) {
                    // TODO: announce to user
                    break;
                }
                if (buildableItem.executable) {
                    const runUrl = buildableItem.executable.url;
                    if (runUrl) {
                        const consoleUrl = runUrl + "consoleFull";
                        window.location.href = consoleUrl;
                        break;
                    }
                }
                // TODO: announce to user
                // TODO: we could also do a capped exponential backoff: 1, 2, 4, 4, 4, 4
                await JenkinsBuild.sleep(1000);
            }
        } else if (400 == response.status) {
            // build is parameterized, try again with HTTP GET
            window.location.href = request.url;
        }
    }

    // https://stackoverflow.com/a/47092642/98903
    static async sleep(milliseconds: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }
}
