import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsConfigure extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);

        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems) {
            const lastItem = breaCrumbListItems.item(
                breaCrumbListItems.length - 1
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
