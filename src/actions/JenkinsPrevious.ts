import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsPrevious extends GoToAction {
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
                const prevRun = Number.parseInt(lastPart, 10) - 1;
                urlParts[urlParts.length - 1] = prevRun.toString();
                const rebuiltPath = urlParts.join("/") + "/";
                return JenkinsHelpers.buildUrl(urlString, rebuiltPath);
            }
        }
        return null;
    }
}
