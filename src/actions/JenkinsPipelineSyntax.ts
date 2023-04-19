import { JenkinsHelpers } from "../JenkinsHelpers";
import { GoToAction } from "./GoToAction";

export class JenkinsPipelineSyntax extends GoToAction {
    navigate(doc: Document, url: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        /* <a> elements with an href ending in "pipeline-syntax" */
        const selector = "a[href$='/pipeline-syntax']";
        const anchor: HTMLAnchorElement | null =
            bodyElement.querySelector(selector);
        if (anchor) {
            return JenkinsHelpers.buildUrl(url, anchor.href);
        }
        const crumbSelector =
            JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const crumbListItems = doc.querySelectorAll(crumbSelector);
        if (1 == crumbListItems.length) {
            const listItem = crumbListItems.item(0);
            const anchor = listItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return JenkinsHelpers.buildUrl(
                        url,
                        path + "pipeline-syntax"
                    );
                }
            }
        }

        return null;
    }
}
