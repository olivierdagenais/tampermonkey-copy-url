import { JenkinsHelpers } from "../JenkinsHelpers";
import { GoToAction } from "./GoToAction";

export class JenkinsCredentials extends GoToAction {
    navigate(doc: Document, url: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const jenkinsPage = JenkinsHelpers.parsePage(
            bodyElement,
            url
        );
        const action = "credentials";
        return jenkinsPage.pageOrRootAction(
            action,
        );
    }

}
