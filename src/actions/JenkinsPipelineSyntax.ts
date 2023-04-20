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
        const crumbSelector =
            JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const crumbListItems = doc.querySelectorAll(crumbSelector);
        var index = -1;
        if (1 == crumbListItems.length) {
            index = 0;
        } else if (bodyElement.querySelector(selector)) {
            index = crumbListItems.length - 1;
        }
        if (index >= 0) {
            const listItem = crumbListItems.item(index);
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
