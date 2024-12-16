import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsConsole extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems) {
            const urlParts = JenkinsHelpers.splitUrlPath(urlString);
            const isUrlToRun =
                "job" === urlParts[urlParts.length - 3] &&
                JenkinsHelpers.isInteger(urlParts[urlParts.length - 1]);
            if (isUrlToRun) {
                const lastItem = breaCrumbListItems.item(
                    breaCrumbListItems.length - 1
                );
                const anchor = lastItem.querySelector("a");
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return (
                            JenkinsHelpers.buildUrl(urlString, path) +
                            "consoleFull"
                        );
                    }
                }
                return null;
            } else {
                const mostRecentRunSelector = "tr.build-row a.build-link";
                const anchor = bodyElement.querySelector(mostRecentRunSelector);
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return JenkinsHelpers.buildUrl(
                            urlString,
                            path + "consoleFull"
                        );
                    }
                }
            }
        }
        return null;
    }
}
