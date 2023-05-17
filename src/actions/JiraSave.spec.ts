import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { JiraSave } from "./JiraSave";

function testFindSaveButton(
    html: string,
    url: string
): HTMLInputElement | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut = new JiraSave();

    const actual = cut.findSaveButton(document, url);
    return actual;
}

test("JIRA create issue starting point, standalone", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Create Issue</title>
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

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/secure/CreateIssue!default.jspa"
    );

    assert.isNotNull(actual);
});

test("JIRA create issue details, pop-up", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>[PIG-1] The Chicken contributed, the Pig committed</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="page">
        </div>
        <section
            id="create-subtask-dialog"
            class="aui-dialog2 aui-layer jira-dialog2 jira-dialog-core aui-dialog2-large jira-dialog-open jira-dialog-content-ready"
            role="dialog"
            aria-labelledby="jira-dialog2__heading"
            style="z-index: 3000"
            data-aui-focus="false"
            data-aui-blanketed="true"
            open=""
            tabindex="-1"
            >
            <footer class="aui-dialog2-footer">
                <div class="buttons-container form-footer">
                    <div class="buttons">
                        <label
                            for="qf-create-another"
                            class="qf-create-another"
                            >
                            <input id="qf-create-another" type="checkbox" />
                            Create another
                        </label>
                        <input
                            accesskey="s"
                            title="Press Alt+Shift+s to submit this form"
                            class="aui-button aui-button-primary"
                            id="create-issue-submit"
                            name="Edit"
                            type="submit"
                            value="Create"
                            form="dialog-form"
                            resolved=""
                            />
                        <button
                            type="button"
                            accesskey="\`"
                            title="Press Alt+Shift+\` to cancel"
                            class="aui-button aui-button-link cancel"
                            resolved=""
                            >
                            Cancel
                        </button>
                    </div>
                </div>
            </footer>
        </section>
        </body>
</html>
`;

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/browse/PIG-1"
    );

    assert.isNotNull(actual);
});

test("JIRA create issue details, standalone", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Create Issue</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="page">
            <main role="main" id="main" class="aui-page-panel-content">
                <form
                    action="CreateIssueDetails.jspa"
                    class="aui"
                    enctype="multipart/form-data"
                    id="issue-create"
                    method="post"
                    >
                    <div class="buttons-container form-footer">
                        <div class="buttons">
                            <input
                                accesskey="s"
                                class="aui-button"
                                id="issue-create-submit"
                                name="Create"
                                title="Press Alt+Shift+s to submit this form"
                                type="submit"
                                value="Create"
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

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/secure/CreateIssueDetails.jspa"
    );

    assert.isNotNull(actual);
});

test("JIRA edit issue, pop-up", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Edit Issue : PIG-1</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="content">
            <main role="main" id="main" class="content">
                <div class="issue-view">
                </div>
            </main>
        </div>
        <section
            id="edit-issue-dialog"
            class="aui-dialog2 aui-layer jira-dialog2 jira-dialog-core aui-dialog2-large jira-dialog-open jira-dialog-content-ready"
            role="dialog"
            aria-labelledby="jira-dialog2__heading"
            style="z-index: 3000"
            data-aui-focus="false"
            data-aui-blanketed="true"
            open=""
            tabindex="-1">
            <header class="aui-dialog2-header jira-dialog-core-heading">
                <h2 id="jira-dialog2__heading" title="Edit Issue : PIG-1">
                    Edit Issue : PIG-1
                </h2>
            </header>
            <div class="aui-dialog2-content jira-dialog-core-content">
                <div class="qf-container">
                </div>
                <div class="attach-files-drop-zone__dragover-mask"></div>
            </div>
            <footer class="aui-dialog2-footer">
                <div class="buttons-container form-footer">
                    <div class="buttons">
                        <span class="throbber"></span>
                        <input
                            accesskey="s"
                            title="Press Alt+Shift+s to submit this form"
                            class="button aui-button aui-button-primary"
                            id="edit-issue-submit"
                            name="Edit"
                            type="submit"
                            value="Update"
                            form="dialog-form"
                            resolved=""
                            />
                        <button
                            type="button"
                            accesskey="\`"
                            title="Press Alt+Shift+\` to cancel"
                            class="aui-button aui-button-link cancel"
                            resolved=""
                            >
                            Cancel
                        </button>
                    </div>
                </div>
            </footer>
        </section>
    </body>
</html>
`;

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/browse/PIG-1"
    );

    assert.isNotNull(actual);
});

test("JIRA edit issue, standalone", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Edit Issue : [PIG-6]</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="content">
            <main role="main" id="main" class="aui-page-panel-content">
                <form
                    action="/jira/secure/EditIssue.jspa?atl_token=BWP3-NZB2-6EDY-6C7K_e3dba220a134df2d189afefa2aaa822b77b4a6fc_lin"
                    class="aui"
                    enctype="multipart/form-data"
                    id="issue-edit"
                    method="post"
                    >
                    <div class="buttons-container form-footer">
                        <div class="buttons">
                            <input
                                accesskey="s"
                                class="aui-button"
                                id="issue-edit-submit"
                                name="Update"
                                title="Press Alt+Shift+s to submit this form"
                                type="submit"
                                value="Update"
                                resolved=""
                                />
                            <a
                                accesskey="\`"
                                class="aui-button aui-button-link cancel"
                                href="/jira/browse/PIG-6"
                                id="issue-edit-cancel"
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

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/secure/EditIssue!default.jspa?id=10301"
    );

    assert.isNotNull(actual);
});

test("JIRA edit issue labels", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Labels: PIG-1</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="content">
            <main role="main" id="main" class="aui-page-panel-content">
                <form
                    action="/jira/secure/EditLabels.jspa?atl_token=BWP3-NZB2-6EDY-6C7K_80b13c0672eae9ae17aff468822446e8ccedd79d_lin"
                    class="aui edit-labels"
                    id="edit-labels-form"
                    method="post"
                    >
                    <div class="buttons-container form-footer">
                        <div class="buttons">
                            <input
                                accesskey="s"
                                class="aui-button"
                                id="submit"
                                name="edit-labels-submit"
                                title="Press Alt+Shift+s to submit this form"
                                type="submit"
                                value="Update"
                                resolved=""
                                />
                            <a
                                accesskey="\`"
                                class="aui-button aui-button-link cancel"
                                href="/jira/browse/PIG-1"
                                id="cancel"
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

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/secure/EditLabels!default.jspa?id=10000"
    );

    assert.isNotNull(actual);
});

test("JIRA edit issue labels, pop-up", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Labels: PIG-1</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="content">
            <main role="main" id="main" class="content">
                <div class="issue-view">
                </div>
            </main>
        </div>
        <div class="jira-dialog-content jira-dialog-core-content">
            <div class="dialog-title hidden">Labels</div>
            <form
                action="/jira/secure/EditLabels.jspa?atl_token=BWP3-NZB2-6EDY-6C7K_e34a6a6b54443f624777e87414875b1a3875eb1a_lin"
                class="aui edit-labels"
                id="edit-labels-form"
                method="post"
                >
                <div class="form-body" style="max-height: 426px">
                    <div class="field-group aui-field-labelpicker">
                        <label for="labels-textarea">
                            Labels
                        </label>
                        <div
                            class="jira-multi-select long-field"
                            id="labels-multi-select"
                            data-query="breakfast">
                            <span class="icon drop-menu noloading" tabindex="-1"></span>
                        </div>
                    </div>
                </div>
                <div class="buttons-container form-footer">
                    <div class="buttons">
                        <input
                            accesskey="s"
                            class="aui-button"
                            id="submit"
                            name="edit-labels-submit"
                            title="Press Alt+Shift+s to submit this form"
                            type="submit"
                            value="Update"
                            resolved=""
                            />
                        <a
                            accesskey="\`"
                            class="aui-button aui-button-link cancel"
                            href="/jira/browse/PIG-1"
                            id="cancel"
                            title="Press Alt+Shift+\` to cancel"
                            resolved=""
                            >
                            Cancel
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </body>
</html>
`;

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/browse/PIG-1"
    );

    assert.isNotNull(actual);
});

test("JIRA add issue link", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Link</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="content">
            <main role="main" id="main" class="aui-page-panel-content">
                <form
                    action="LinkJiraIssue.jspa"
                    method="post"
                    id="link-jira-issue"
                    class="aui dnd-attachment-support"
                    >
                    <div class="buttons-container form-footer">
                        <div class="buttons">
                            <input
                                accesskey="s"
                                class="aui-button"
                                name="Link"
                                title="Press Alt+Shift+s to submit this form"
                                type="submit"
                                value="Link"
                                resolved=""
                                />
                            <a
                                accesskey="\`"
                                class="aui-button aui-button-link cancel"
                                href="/jira/browse/PIG-1"
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

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/secure/LinkJiraIssue!default.jspa?id=10000"
    );

    assert.isNotNull(actual);
});

test("JIRA add issue link, pop-up", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Link</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="content">
            <main role="main" id="main" class="aui-page-panel-content">
            </main>
        </div>
        <div
            id="link-issue-dialog"
            class="jira-dialog jira-dialog-core box-shadow jira-dialog-open popup-width-large jira-dialog-content-ready"
            style="width: 810px; margin-left: -406px; margin-top: -283px">
            <div class="jira-dialog-heading jira-dialog-core-heading">
                <h2 title="Link">Link</h2>
            </div>
            <div class="jira-dialog-content jira-dialog-core-content">
                <div class="aui-group">
                    <div class="aui-item dialog-menu-group">
                        <ul class="dialog-menu">
                            <li>
                                <button
                                    id="add-jira-issue-link-link"
                                    data-url="/jira/secure/LinkJiraIssue!default.jspa?id=10000"
                                    class="dialog-menu-item selected">
                                    Jira Issue
                                </button>
                            </li>
                            <li>
                                <button
                                    id="add-web-link-link"
                                    data-url="/jira/secure/AddWebLink!default.jspa?id=10000"
                                    class="dialog-menu-item">
                                    Web Link
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="aui-item dialog-pane">
                        <form
                            action="LinkJiraIssue.jspa"
                            method="post"
                            id="link-jira-issue"
                            class="aui dnd-attachment-support">
                            <div class="buttons-container form-footer">
                                <div class="buttons">
                                    <input
                                        accesskey="s"
                                        class="aui-button"
                                        name="Link"
                                        title="Press Alt+Shift+s to submit this form"
                                        type="submit"
                                        value="Link"
                                        resolved=""
                                        />
                                    <a
                                        accesskey="\`"
                                        class="aui-button aui-button-link cancel"
                                        href="/jira/browse/PIG-1"
                                        title="Press Alt+Shift+\` to cancel"
                                        resolved=""
                                        >
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
`;

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/browse/PIG-1"
    );

    assert.isNotNull(actual);
});

test("JIRA issue add worklog", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Log work: PIG-1</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="content">
            <main role="main" id="main" class="aui-page-panel-content">
                <form
                    action="CreateWorklog.jspa"
                    class="aui dnd-attachment-support"
                    id="log-work"
                    method="post"
                    >
                    <div class="buttons-container form-footer">
                        <div class="buttons">
                            <input
                                accesskey="s"
                                class="aui-button"
                                id="log-work-submit"
                                name="Log"
                                title="Press Alt+Shift+s to submit this form"
                                type="submit"
                                value="Log"
                                resolved=""
                                />
                            <a
                                accesskey="\`"
                                class="aui-button aui-button-link cancel"
                                href="/jira/browse/PIG-1"
                                id="log-work-cancel"
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

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/secure/CreateWorklog.jspa"
    );

    assert.isNotNull(actual);
});

test("JIRA issue add worklog, pop-up", () => {
    const html = `
<html class="mozilla" lang="en">
    <head>
        <title>Log Work: PIG-1</title>
    </head>
    <body
        id="jira"
        data-version="8.20.17"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <div id="content">
        </div>
        <div
            id="log-work-dialog"
            class="jira-dialog jira-dialog-core box-shadow jira-dialog-open popup-width-large jira-dialog-content-ready"
            style="width: 810px; margin-left: -406px; margin-top: -358.5px"
            >
            <div class="jira-dialog-heading jira-dialog-core-heading">
                <h2 title="Log Work: PIG-1">Log Work: PIG-1</h2>
            </div>
            <div class="jira-dialog-content jira-dialog-core-content">
                <form
                    action="CreateWorklog.jspa"
                    class="aui dnd-attachment-support"
                    id="log-work"
                    method="post"
                    >
                    <div class="buttons-container form-footer">
                        <div class="buttons">
                            <input
                                accesskey="s"
                                class="aui-button"
                                id="log-work-submit"
                                name="Log"
                                title="Press Alt+Shift+s to submit this form"
                                type="submit"
                                value="Log"
                                resolved=""
                                />
                            <a
                                accesskey="\`"
                                class="aui-button aui-button-link cancel"
                                href="/jira/browse/PIG-1"
                                id="log-work-cancel"
                                title="Press Alt+Shift+\` to cancel"
                                resolved=""
                                >
                                Cancel
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </body>
</html>
`;

    const actual = testFindSaveButton(
        html,
        "http://localhost:2990/jira/browse/PIG-1"
    );

    assert.isNotNull(actual);
});
