import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsDashboard extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const jenkinsPage = JenkinsHelpers.parsePage(
            bodyElement,
            urlString
        );
        const firstCrumb = jenkinsPage.crumbs[0];
        return jenkinsPage.buildUrl(
            firstCrumb.href
        );
    }
}
