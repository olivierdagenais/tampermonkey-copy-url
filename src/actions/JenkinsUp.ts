import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsUp extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems && breaCrumbListItems.length > 1) {
            var offset = 2;
            const urlParts = JenkinsHelpers.splitUrlPath(urlString);
            const lastPart = urlParts[urlParts.length - 1];
            // execution/node/5/
            if (
                urlParts.length > 3 &&
                JenkinsHelpers.isInteger(lastPart) &&
                "node" == urlParts[urlParts.length - 2] &&
                "execution" == urlParts[urlParts.length - 3]
            ) {
                const penultimateItem = breaCrumbListItems.item(
                    breaCrumbListItems.length - 2
                );
                const anchor = penultimateItem.querySelector("a");
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return JenkinsHelpers.buildUrl(
                            urlString,
                            path + "flowGraphTable/"
                        );
                    }
                }
                return null;
            }
            if ("consoleFull" == lastPart || "console" == lastPart) {
                offset = 1;
            }
            const penultimateItem = breaCrumbListItems.item(
                breaCrumbListItems.length - offset
            );
            const anchor = penultimateItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return JenkinsHelpers.buildUrl(urlString, path);
                }
            }
        }
        return null;
    }
}
