import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsConsole extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const jenkinsPage = JenkinsHelpers.parsePage(
            bodyElement,
            urlString
        );
        const urlParts = jenkinsPage.urlParts;
        const isUrlToRun =
            "job" === urlParts[urlParts.length - 3] &&
            JenkinsHelpers.isInteger(urlParts[urlParts.length - 1]);
        if (isUrlToRun) {
            const lastCrumb = jenkinsPage.lastCrumb();
            const path = lastCrumb.href;
            return jenkinsPage.buildUrl(path + "consoleFull");
        }
        else {
            const mostRecentRunSelector =
                JenkinsHelpers.getMostRecentRunSelector(bodyElement);
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
        return null;
    }
}
