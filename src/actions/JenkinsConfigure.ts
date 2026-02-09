import { GoToAction } from "./GoToAction";
import { JenkinsHelpers } from "../JenkinsHelpers";

export class JenkinsConfigure extends GoToAction {
    navigate(doc: Document, urlString: string): string | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const jenkinsPage = JenkinsHelpers.parsePage(
            bodyElement,
            urlString
        );
        const jobCrumb = jenkinsPage.findJobCrumb();
        if (jobCrumb) {
            const path = jobCrumb.href;
            return jenkinsPage.buildUrl(path + "configure");
        }
        const lastCrumb = jenkinsPage.lastCrumb();
        const path = lastCrumb.href;
        return jenkinsPage.buildUrl(path + "configure");
    }
}
