import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { JiraSave } from "./JiraSave";

function testFindSaveableForm(html: string, url: string): HTMLFormElement | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut = new JiraSave();

    const actual = cut.findSaveableForm(document, url);
    return actual;
}

test("JIRA create issue starting point, standalone", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>[CHKN-1] This is your first task</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="page">
            <main role="main" id="main" class="aui-page-panel-content">
                <form
                    action="CreateIssue.jspa"
                    class="aui"
                    id="issue-create"
                    method="post"
                    >
                    <div class="buttons-container form-footer">
                        <div class="buttons">
                            <input
                                accesskey="s"
                                class="aui-button"
                                id="issue-create-submit"
                                name="Next"
                                title="Press Alt+Shift+s to submit this form"
                                type="submit"
                                value="Next"
                                resolved=""
                                />
                            <a
                                accesskey="\`"
                                class="aui-button aui-button-link cancel"
                                href="default.jsp"
                                id="issue-create-cancel"
                                title="Press Alt+Shift+\` to cancel"
                                resolved=""
                                >
                                Cancel
                            </a>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    </body>
</html>
`;

    const actual = testFindSaveableForm(
        html,
        "http://localhost:2990/jira/browse/CHKN-1"
    );

    assert.isNotNull(actual);
});
