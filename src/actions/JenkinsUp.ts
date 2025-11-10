import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsUp extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breadCrumbListItems = doc.querySelectorAll(selector);
        if (breadCrumbListItems && breadCrumbListItems.length > 1) {
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
                const penultimateItem = breadCrumbListItems.item(
                    breadCrumbListItems.length - 2
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
            const specialCases = new Set<string>(
                [
                    "configure",
                    "consoleFull",
                    "console",
                ]);
            if (specialCases.has(lastPart)) {
                offset = 1;
            }
            for (let i = breadCrumbListItems.length - offset; i >= 0; i--) {
                const item = breadCrumbListItems.item(i);
                const anchor = item.querySelector("a");
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return JenkinsHelpers.buildUrl(urlString, path);
                    }
                }
            }
        }

        if (breadCrumbListItems) {
            const firstItem = breadCrumbListItems.item(0);
            const anchor = firstItem.querySelector("a");
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
