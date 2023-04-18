import { JenkinsHelpers } from "../JenkinsHelpers";
import { GoToAction } from "./GoToAction";

export class JenkinsPipelineSyntax extends GoToAction {
    buildUrl(urlString: string, newPath: string): string {
        const url = new URL(urlString);
        url.pathname = newPath;
        return url.toString();
    }

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
            return this.buildUrl(url, anchor.href);
        }

        return null;
    }
}
