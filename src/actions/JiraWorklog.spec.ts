import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { JiraWorklog } from "./JiraWorklog";
import { GoToAction } from "./GoToAction";

function testNavigate(html: string, url: string): string | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: GoToAction = new JiraWorklog();

    const actual: string | null = cut.navigate(document, url);
    return actual;
}

test("JIRA v9.7.0", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>[CHKN-1] This is your first task</title>
    </head>
    <body
        id="jira"
        class="aui-layout aui-theme-default aui-page-sidebar aui-sidebar-collapsed"
        data-version="9.7.0"
        data-aui-version="9.3.17">
        <div id="page">
            <div id="content">
                <div class="aui-page-panel">
                    <!-- etc., etc... -->
                    <aui-dropdown-menu
                        id="opsbar-operations_more_drop"
                        resolved=""
                        role="menu"
                        class="aui-dropdown2 aui-layer aui-alignment-side-bottom aui-alignment-snap-auto"
                        tabindex="-1"
                        style="z-index: auto; margin: 0px"
                        data-aui-alignment="bottom auto"
                        data-aui-alignment-static="true"
                        x-placement="bottom-start"
                        >
                        <aui-section resolved="" class="aui-dropdown2-section">
                            <span aria-hidden="true" class="aui-dropdown2-heading"></span>
                            <div class="aui-dropdown2-item-group" role="group">
                                <aui-item-link
                                    href="/jira/secure/CreateWorklog!default.jspa?id=10000"
                                    id="log-work"
                                    class="issueaction-log-work"
                                    title="Log work against this issue"
                                    resolved=""
                                    >
                                    <a
                                        role="menuitem"
                                        tabindex="-1"
                                        href="/jira/secure/CreateWorklog!default.jspa?id=10000"
                                        >
                                            <span class="trigger-label">Log work</span>
                                    </a>
                                </aui-item-link>
                            </div>
                        </aui-section>
                    </aui-dropdown-menu>
                </div>
            </div>
        </div>
    </body>
</html>
`;

    const actual = testNavigate(
        html,
        "http://localhost:2990/jira/browse/CHKN-1"
    );

    assert.equal(
        actual,
        "http://localhost:2990/jira/secure/CreateWorklog!default.jspa?id=10000"
    );
});
