import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsDashboard extends GoToAction {
    buildUrl(urlString: string, newPath: string): string {
        const url = new URL(urlString);
        url.pathname = newPath;
        return url.toString();
    }

    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);

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
