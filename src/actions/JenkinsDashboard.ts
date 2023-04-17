import { GoToAction } from "./GoToAction";

export class JenkinsDashboard extends GoToAction {
    buildUrl(urlString: string, newPath: string): string {
        const url = new URL(urlString);
        url.pathname = newPath;
        return url.toString();
    }

    navigate(doc: Document, urlString: string): string | null {
        const bodyElement: HTMLElement | null = doc.querySelector(
            "html body[id=jenkins]"
        );
        if (!bodyElement) {
            return null;
        }

        var selector = ".jenkins-breadcrumbs__list-item";
        const jenkinsVersion = bodyElement.getAttribute("data-version");
        switch (jenkinsVersion) {
            case "2.361.4":
                selector = ".jenkins-breadcrumbs .item";
                break;
        }

        const breaCrumbListItem = doc.querySelector(selector);
        if (breaCrumbListItem) {
            const anchor = breaCrumbListItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return this.buildUrl(urlString, path);
                }
            }
        }
        return null;
    }
}
