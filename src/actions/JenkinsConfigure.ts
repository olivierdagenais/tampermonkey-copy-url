import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsConfigure extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breadCrumbListItems = doc.querySelectorAll(selector);
        if (breadCrumbListItems) {
            const urlParts = JenkinsHelpers.splitUrlPath(urlString);
            const isUrlToRun =
                "job" === urlParts[urlParts.length - 3] &&
                JenkinsHelpers.isInteger(urlParts[urlParts.length - 1]);
            if (isUrlToRun) {
                const penultimateItem = breadCrumbListItems.item(
                    breadCrumbListItems.length - 2
                );
                const anchor = penultimateItem.querySelector("a");
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return (
                            JenkinsHelpers.buildUrl(urlString, path) +
                            "configure"
                        );
                    }
                }
                return null;
            }
            const lastItem = breadCrumbListItems.item(
                breadCrumbListItems.length - 1
            );
            const anchor = lastItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return (
                        JenkinsHelpers.buildUrl(urlString, path) + "configure"
                    );
                }
            }
        }
        return null;
    }
}
