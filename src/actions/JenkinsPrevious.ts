import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsPrevious extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breadCrumbListItems = doc.querySelectorAll(selector);
        if (breadCrumbListItems) {
            var urlParts = JenkinsHelpers.splitUrlPath(urlString);
            for (var index = urlParts.length - 1; index >= 2; index--) {
                const lastPart = urlParts[index];
                const isUrlToRun =
                    "job" === urlParts[index - 2] &&
                    JenkinsHelpers.isInteger(lastPart);
                if (isUrlToRun) {
                    const prevRun = Number.parseInt(lastPart, 10) - 1;
                    urlParts[index] = prevRun.toString();
                    const rebuiltPath = urlParts.join("/");
                    return JenkinsHelpers.buildUrl(urlString, rebuiltPath);
                }
            }
        }
        return null;
    }
}
