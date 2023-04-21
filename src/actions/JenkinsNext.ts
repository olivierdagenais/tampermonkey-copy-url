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
            const lastPart = urlParts[urlParts.length - 1];
            const isUrlToRun =
                "job" === urlParts[urlParts.length - 3] &&
                JenkinsHelpers.isInteger(lastPart);
            if (isUrlToRun) {
                const nextRun = Number.parseInt(lastPart, 10) + 1;
                urlParts[urlParts.length - 1] = nextRun.toString();
                const rebuiltPath = urlParts.join("/") + "/";
                return JenkinsHelpers.buildUrl(urlString, rebuiltPath);
            } else {
                const mostRecentRunSelector = "tr.build-row a.build-link";
                const anchor = bodyElement.querySelector(mostRecentRunSelector);
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return JenkinsHelpers.buildUrl(urlString, path);
                    }
                }
            }
        }
        return null;
    }
}
