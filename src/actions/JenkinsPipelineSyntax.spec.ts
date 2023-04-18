import { assert, test } from "vitest";
import { JenkinsPipelineSyntax } from "./JenkinsPipelineSyntax";
import { JSDOM } from "jsdom";

function testNavigate(html: string, url: string): string | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut = new JenkinsPipelineSyntax();

    const actual = cut.navigate(document, url);
    return actual;
}

test("job page", () => {
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
        <!-- etc., etc... -->
        <div
            id="side-panel"
            class="clear
            >
            <div id="tasks">
                <div class="task">
                    <span class="task-link-wrapper">
                        <a
                            href="/job/Project/job/Repository/job/Branch/pipeline-syntax"
                            class="task-link"
                            >
                            <span class="task-icon-link">
                                <svg />
                            </span>
                            <span class="task-link-text">
                                Pipeline Syntax
                            </span>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/"
    );

    assert.equal(
        actual,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/pipeline-syntax"
    );
});
