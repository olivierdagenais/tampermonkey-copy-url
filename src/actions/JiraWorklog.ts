import { GoToAction } from "./GoToAction";

/*<a
    id="log-work-link"
    href="/secure/CreateWorklog!default.jspa?id=1645639"
    class="issueaction-log-work aui-icon aui-icon-small aui-iconfont-add issueaction-aui-icon"
    title="Log Work for this issue"
    >
    <span>Log work</span>
</a>*/
export class JiraWorklog extends GoToAction {
    navigate(doc: Document, url: string): string | null {
        const baseUrl = new URL(url);
        baseUrl.pathname = "";
        // JIRA v9.7.0
        const anchor: HTMLAnchorElement | null = doc.querySelector(
            "aui-item-link#log-work a"
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
