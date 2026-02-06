import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsUp extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const jenkinsPage = JenkinsHelpers.parsePage(
            bodyElement,
            urlString
        );
        const numCrumbs = jenkinsPage.crumbs.length;
        if (numCrumbs > 1) {
            let offset = 2;
            const urlParts = jenkinsPage.urlParts;
            const lastPart = urlParts[urlParts.length - 1];
            // execution/node/5/
            if (
                urlParts.length > 3 &&
                JenkinsHelpers.isInteger(lastPart) &&
                "node" == urlParts[urlParts.length - 2] &&
                "execution" == urlParts[urlParts.length - 3]
            ) {
                const penultimateCrumb = jenkinsPage.penultimateCrumb();
                const path = penultimateCrumb.href;
                return jenkinsPage.buildUrl(path + "flowGraphTable/");
            }
            const crumb = jenkinsPage.crumbs[numCrumbs - offset];
            const path = crumb.href;
            return jenkinsPage.buildUrl(path);
        }
        const firstCrumb = jenkinsPage.firstCrumb();
        const path = firstCrumb.href;
        return jenkinsPage.buildUrl(path);
    }
}
