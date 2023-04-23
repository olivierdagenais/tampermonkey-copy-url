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
        var selector = ".jenkins-breadcrumbs__list-item";
        const jenkinsVersion = bodyElement.getAttribute("data-version");
        switch (jenkinsVersion) {
            case "2.361.4":
                selector = ".jenkins-breadcrumbs .item";
                break;
        }
        return selector;
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
