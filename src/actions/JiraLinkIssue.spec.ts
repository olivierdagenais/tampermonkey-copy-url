import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { JiraLinkIssue } from "./JiraLinkIssue";
import { GoToAction } from "./GoToAction";

function testNavigate(html: string, url: string): string | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: GoToAction = new JiraLinkIssue();

    const actual: string | null = cut.navigate(document, url);
    return actual;
}

test("JIRA", () => {
    const html = `
<html>
    <head>
        <title>
            [PIG-1] The Chicken contributed, the Pig committed - Your Company Jira
        </title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="page">
            <div id="content">
                <!-- etc., etc... -->
                <aui-dropdown-menu
                    id="opsbar-operations_more_drop"
                    resolved=""
                    role="menu"
                    class="aui-dropdown2 aui-layer"
                    tabindex="-1"
                    >
                    <aui-section resolved="" class="aui-dropdown2-section">
                        <div class="aui-dropdown2-item-group" role="group">
                            <aui-item-link
                                href="/jira/secure/LinkJiraIssue!default.jspa?id=10000"
                                id="link-issue"
                                class="issueaction-link-issue"
                                title="Link this issue to another issue or item"
                                resolved=""
                                >
                                <a
                                    role="menuitem"
                                    tabindex="-1"
                                    href="/jira/secure/LinkJiraIssue!default.jspa?id=10000">
                                    <span class="trigger-label">
                                        Link
                                    </span>
                                </a>
                            </aui-item-link>
                        </div>
                    </aui-section>
                </aui-dropdown-menu>
            </div>
        </div>
    </body>
</html>
`;

    const actual = testNavigate(
        html,
        "http://localhost:2990/jira/browse/PIG-1"
    );

    assert.equal(
        actual,
        "http://localhost:2990/jira/secure/LinkJiraIssue!default.jspa?id=10000"
    );
});
