import { GoToAction } from "../GoToAction";

/*<a
    id="log-work-link"
    href="/secure/CreateWorklog!default.jspa?id=1645639"
    class="issueaction-log-work aui-icon aui-icon-small aui-iconfont-add issueaction-aui-icon"
    title="Log Work for this issue"
    >
    <span>Log work</span>
</a>*/
export class JiraWorklog implements GoToAction {
    navigate(doc: Document, url: string): string | null {
        throw new Error("Method not implemented.");
    }
}
