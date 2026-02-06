import { JenkinsHelpers } from "../JenkinsHelpers";
import { GoToAction } from "./GoToAction";
import { Crumb } from "../Crumb";

export class JenkinsCredentials extends GoToAction {
    navigate(doc: Document, url: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        /* <a> elements with an href ending in "credentials" */
        const selector = "a[href$='/credentials']";
        const jenkinsPage = JenkinsHelpers.parsePage(
            bodyElement,
            url
        );
        let crumb: Crumb | undefined = undefined;
        if (1 == jenkinsPage.crumbs.length) {
            crumb = jenkinsPage.firstCrumb();
        }
        else if (bodyElement.querySelector(selector)) {
            crumb = jenkinsPage.lastCrumb()
        }
        if (crumb) {
            const path = crumb.href;
            return jenkinsPage.buildUrl(path + "credentials");
        }
        return null;
    }
}
