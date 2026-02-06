import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsNext extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const jenkinsPage = JenkinsHelpers.parsePage(
            bodyElement,
            urlString
        );
        let urlParts = jenkinsPage.urlParts;
        for (let index = urlParts.length - 1; index >= 2; index--) {
            const lastPart = urlParts[index];
            const isUrlToRun =
                "job" === urlParts[index - 2] &&
                JenkinsHelpers.isInteger(lastPart);
            if (isUrlToRun) {
                const nextRun = Number.parseInt(lastPart, 10) + 1;
                urlParts[index] = nextRun.toString();
                const rebuiltPath = urlParts.join("/");
                return jenkinsPage.buildUrl(rebuiltPath);
            }
            else {
                const mostRecentRunSelector =
                    JenkinsHelpers.getMostRecentRunSelector(bodyElement);
                const anchor = bodyElement.querySelector(
                    mostRecentRunSelector
                );
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return jenkinsPage.buildUrl(path);
                    }
                }
            }
        }
        return null;
    }
}
