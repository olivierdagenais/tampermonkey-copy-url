import { JenkinsHelpers } from "../JenkinsHelpers";
import { GoToAction } from "./GoToAction";

export class JenkinsBuild extends GoToAction {
    navigate(doc: Document, url: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        /* <a> elements with an href ending in "/build?delay=0sec" */
        const linkSelector = "a[href$='/build?delay=0sec']";
        const crumbSelector =
            JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const crumbListItems = doc.querySelectorAll(crumbSelector);
        if (bodyElement.querySelector(linkSelector)) {
            const index = crumbListItems.length - 1;
            const listItem = crumbListItems.item(index);
            const anchor = listItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return JenkinsHelpers.buildUrl(
                        url,
                        path + "build",
                        "delay=0sec"
                    );
                }
            }
        }

        return null;
    }
}
