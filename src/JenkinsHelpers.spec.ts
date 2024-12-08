import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { JenkinsHelpers } from "./JenkinsHelpers";

function getBodyElement(html: string): HTMLElement {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const result = JenkinsHelpers.getBodyElement(document);
    if (!result) {
        throw new Error("Invalid HTML");
    }
    return result;
}

test("getMostRecentRunSelector at 2.387.1", () => {
    const html = `
<html>
    <head>
        <title>Branch [Project » Repository] [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.387.1"
        data-version="2.387.1"
        >
    </body>
</html>
`;
    const bodyElement = getBodyElement(html);

    const actual = JenkinsHelpers.getMostRecentRunSelector(bodyElement);

    assert.equal(actual, "tr.build-row a.build-link");
});

test("getMostRecentRunSelector at 2.463", () => {
    const html = `
<html>
    <head>
        <title>Branch [Project » Repository] [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.463"
        data-version="2.463"
        >
    </body>
</html>
`;
    const bodyElement = getBodyElement(html);

    const actual = JenkinsHelpers.getMostRecentRunSelector(bodyElement);

    assert.equal(
        actual,
        "#jenkins-build-history .app-builds-container__item__inner__link"
    );
});

test("getMostRecentRunSelector at 2.479.2", () => {
    const html = `
<html>
    <head>
        <title>Branch [Project » Repository] [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.479.2"
        data-version="2.479.2"
        >
    </body>
</html>
`;
    const bodyElement = getBodyElement(html);

    const actual = JenkinsHelpers.getMostRecentRunSelector(bodyElement);

    assert.equal(
        actual,
        "#jenkins-build-history .app-builds-container__item__inner__link"
    );
});

test("splitUrlPath with deep URL", () => {
    const input =
        "http://localhost:8080/job/Project/job/Repository/job/Branch/";

    const actual = JenkinsHelpers.splitUrlPath(input);

    assert.equal(actual.length, 7);
    assert.equal(actual[0], "");
    assert.equal(actual[1], "job");
    assert.equal(actual[2], "Project");
    assert.equal(actual[3], "job");
    assert.equal(actual[4], "Repository");
    assert.equal(actual[5], "job");
    assert.equal(actual[6], "Branch");
});
