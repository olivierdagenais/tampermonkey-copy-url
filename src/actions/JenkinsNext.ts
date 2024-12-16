import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsNext extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems) {
            var urlParts = JenkinsHelpers.splitUrlPath(urlString);
            for (var index = urlParts.length - 1; index >= 2; index--) {
                const lastPart = urlParts[index];
                const isUrlToRun =
                    "job" === urlParts[index - 2] &&
                    JenkinsHelpers.isInteger(lastPart);
                if (isUrlToRun) {
                    const nextRun = Number.parseInt(lastPart, 10) + 1;
                    urlParts[index] = nextRun.toString();
                    const rebuiltPath = urlParts.join("/");
                    return JenkinsHelpers.buildUrl(urlString, rebuiltPath);
                } else {
                    const mostRecentRunSelector =
                        JenkinsHelpers.getMostRecentRunSelector(bodyElement);
                    const anchor = bodyElement.querySelector(
                        mostRecentRunSelector
                    );
                    if (anchor) {
                        const path = anchor.getAttribute("href");
                        if (path) {
                            return JenkinsHelpers.buildUrl(urlString, path);
                        }
                    }
                }
            }
        }
        return null;
    }
}
