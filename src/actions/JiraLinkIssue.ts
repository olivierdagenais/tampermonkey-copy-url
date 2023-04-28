import { GoToAction } from "./GoToAction";

export class JiraLinkIssue extends GoToAction {
    navigate(doc: Document, url: string): string | null {
        const baseUrl = new URL(url);
        baseUrl.pathname = "";
        const anchor: HTMLAnchorElement | null = doc.querySelector(
            "aui-item-link#link-issue a"
        );
        if (anchor) {
            const path: string | null = anchor.getAttribute("href");
            if (path) {
                const destinationUrl = new URL(path, baseUrl);
                return destinationUrl.toString();
            }
        }
        return null;
    }
}
