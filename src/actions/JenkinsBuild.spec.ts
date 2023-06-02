import { assert, test } from "vitest";
import { BuildableItem } from "./JenkinsBuild";
import { JenkinsBuild } from "./JenkinsBuild";
import { JSDOM } from "jsdom";

// @vitest-environment happy-dom

function testNavigate(html: string, url: string): Request | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut = new JenkinsBuild();

    const actual = cut.navigate(document, url);
    return actual;
}

test("job page 2.361.4", () => {
    const html = `
<html>
    <head
        data-crumb-header="Jenkins-Crumb"
        data-crumb-value="c928c875447b927341155d6b0f64ab0720e27f9fd2972c04f41dd48d4aa9e4d3"
        >
        <title>Branch [Project » Repository] [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.361.4"
        data-version="2.361.4"
        >
        <!-- etc., etc... -->
        <div class="jenkins-breadcrumbs">
            <ul id="breadcrumbs">
                <li class="item">
                    <a href="/" class="model-link">
                        Dashboard
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/" class="children"></li>
                <li class="item">
                    <a href="/job/Project/" class="model-link">
                        Project
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/Project/" class="children"></li>
                <li class="item">
                    <a href="/job/Project/job/Repository/" class="model-link">
                        Repository
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/Project/job/Repository/" class="children"></li>
                <li class="item">
                    <a href="/job/Project/job/Repository/job/Branch/" class="model-link">
                        Branch
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li
                    href="/job/Project/job/Repository/job/Branch/"
                    class="children">
                </li>
            </ul>
            <div id="breadcrumb-menu-target"></div>
        </div>
        <div
            id="side-panel"
            >
            <div id="tasks">
                <div class="task ">
                    <span class="task-link-wrapper ">
                        <a
                            onclick="return build_id677(this)"
                            href="/job/Project/job/Repository/job/Branch/build?delay=0sec"
                            class="task-link ">
                            <span class="task-icon-link">
                                <svg />
                            </span>
                            <span class="task-link-text">Build Now</span>
                        </a>
                        <a
                            href="/job/Project/job/Repository/job/Branch/pipeline-syntax"
                            class="task-link "
                            >
                            <span class="task-icon-link">
                                <svg / >
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
        actual?.url,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/build?delay=0sec"
    );
});

test("run page", () => {
    const html = `
<html>
    <head
        data-crumb-header="Jenkins-Crumb"
        data-crumb-value="c928c875447b927341155d6b0f64ab0720e27f9fd2972c04f41dd48d4aa9e4d3"
        >
        <title>Project » Repository » Branch #1 [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.387.1"
        data-version="2.387.1"
        >
        <!-- etc., etc... -->
        <div
            id="breadcrumbBar"
            class="jenkins-breadcrumbs"
            aria-label="breadcrumb"
            >
            <ol class="jenkins-breadcrumbs__list" id="breadcrumbs">
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/" class="model-link">
                        Dashboard
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/" class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/job/Project/" class="model-link">
                        Project
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/Project/" class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/job/Project/job/Repository/" class="model-link">
                        Repository
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/Project/job/Repository/" class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/job/Project/job/Repository/job/Branch/" class="model-link">
                        Branch
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/Project/job/Repository/job/Branch/" class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/job/Project/job/Repository/job/Branch/2/" class="model-link">
                        #1
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li class="separator"></li>
            </ol>
        </div>
    </body>
</html>`;

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1"
    );

    assert.equal(
        actual?.url,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/build?delay=0sec"
    );
});

test("run console page", () => {
    const html = `
<html>
    <head
        data-crumb-header="Jenkins-Crumb"
        data-crumb-value="c928c875447b927341155d6b0f64ab0720e27f9fd2972c04f41dd48d4aa9e4d3"
        >
        <title>Project » Repository » Branch #1 Console [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.387.1"
        data-version="2.387.1"
        >
        <!-- etc., etc... -->
        <div
            id="breadcrumbBar"
            class="jenkins-breadcrumbs"
            aria-label="breadcrumb"
            >
            <ol class="jenkins-breadcrumbs__list" id="breadcrumbs">
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/" class="model-link">
                        Dashboard
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/" class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/job/Project/" class="model-link">
                        Project
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/Project/" class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/job/Project/job/Repository/" class="model-link">
                        Repository
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/Project/job/Repository/" class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/job/Project/job/Repository/job/Branch/" class="model-link">
                        Branch
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/Project/job/Repository/job/Branch/" class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a href="/job/Project/job/Repository/job/Branch/1/" class="model-link">
                        #1
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li class="separator"></li>
            </ol>
        </div>
    </body>
</html>`;

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/consoleFull"
    );

    assert.equal(
        actual?.url,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/build?delay=0sec"
    );
});

test("dashboard page", () => {
    const html = `
<html>
    <head
        data-crumb-header="Jenkins-Crumb"
        data-crumb-value="c928c875447b927341155d6b0f64ab0720e27f9fd2972c04f41dd48d4aa9e4d3"
        >
        <title>Branch [Project » Repository] [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.361.4"
        data-version="2.361.4"
        >
        <!-- etc., etc... -->
        <div class="jenkins-breadcrumbs">
            <ul id="breadcrumbs">
                <li class="item">
                    <a href="/" class="model-link">
                        Dashboard
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/" class="children"></li>
            </ul>
            <div id="breadcrumb-menu-target"></div>
        </div>
    </body>
</html>`;

    const actual = testNavigate(html, "http://localhost:8080");

    assert.equal(actual, null);
});

async function testCreateBuildableItem(json: string): Promise<BuildableItem> {
    const body: XMLHttpRequestBodyInit = json;
    const responseInit: ResponseInit = {
        headers: [
            ["Content-Type", "application/json;charset=utf-8"],
            ["X-Jenkins", "2.361.4"],
        ],
        status: 200,
        statusText: "OK",
    };
    const response: Response = new Response(body, responseInit);

    const actual = await JenkinsBuild.createBuildableItem(response);

    return actual;
}

test("createBuildableItem: run queued and stuck", async () => {
    const json = `{
    "_class": "hudson.model.Queue$BuildableItem",
    "actions": [
        {
            "_class": "hudson.model.CauseAction",
            "causes": [
                {
                    "_class": "hudson.model.Cause$UserIdCause",
                    "shortDescription": "Started by user Olivier Admin Dagenais",
                    "userId": "admin",
                    "userName": "Olivier Admin Dagenais"
                }
            ]
        }
    ],
    "blocked": false,
    "buildable": true,
    "id": 18,
    "inQueueSince": 1684891412992,
    "params": "",
    "stuck": true,
    "task": {
        "_class": "hudson.model.FreeStyleProject",
        "name": "Non Parameterized Branch",
        "url": "http://localhost:8080/job/Project/job/Repository/job/Non%20Parameterized%20Branch/",
        "color": "blue"
    },
    "url": "queue/item/18/",
    "why": "'Jenkins' doesn't have label 'chicken'",
    "buildableStartMilliseconds": 1684891412993,
    "pending": false
}`;

    const actual = await testCreateBuildableItem(json);

    assert.equal(actual.blocked, false);
    assert.equal(actual.buildable, true);
    assert.equal(actual.stuck, true);
    assert.equal(actual.cancelled, false);
    assert.isNull(actual.executable);
});

test("createBuildableItem: run aborted", async () => {
    const json = `{
    "_class": "hudson.model.Queue$LeftItem",
    "actions": [
        {
            "_class": "hudson.model.CauseAction",
            "causes": [
                {
                    "_class": "hudson.model.Cause$UserIdCause",
                    "shortDescription": "Started by user Olivier Admin Dagenais",
                    "userId": "admin",
                    "userName": "Olivier Admin Dagenais"
                }
            ]
        }
    ],
    "blocked": false,
    "buildable": false,
    "id": 18,
    "inQueueSince": 1684891412992,
    "params": "",
    "stuck": false,
    "task": {
        "_class": "hudson.model.FreeStyleProject",
        "name": "Non Parameterized Branch",
        "url": "http://localhost:8080/job/Project/job/Repository/job/Non%20Parameterized%20Branch/",
        "color": "blue"
    },
    "url": "queue/item/18/",
    "why": null,
    "cancelled": true,
    "executable": null
}`;

    const actual = await testCreateBuildableItem(json);

    assert.equal(actual.blocked, false);
    assert.equal(actual.buildable, false);
    assert.equal(actual.stuck, false);
    assert.equal(actual.cancelled, true);
    assert.isNull(actual.executable);
});

test("createBuildableItem: run completed", async () => {
    const json = `{
    "_class": "hudson.model.Queue$LeftItem",
    "actions": [
        {
            "_class": "hudson.model.CauseAction",
            "causes": [
                {
                    "_class": "hudson.model.Cause$UserIdCause",
                    "shortDescription": "Started by user Olivier Admin Dagenais",
                    "userId": "admin",
                    "userName": "Olivier Admin Dagenais"
                }
            ]
        }
    ],
    "blocked": false,
    "buildable": false,
    "id": 20,
    "inQueueSince": 1684891664768,
    "params": "",
    "stuck": false,
    "task": {
        "_class": "hudson.model.FreeStyleProject",
        "name": "Non Parameterized Branch",
        "url": "http://localhost:8080/job/Project/job/Repository/job/Non%20Parameterized%20Branch/",
        "color": "blue"
    },
    "url": "queue/item/20/",
    "why": null,
    "cancelled": false,
    "executable": {
        "_class": "hudson.model.FreeStyleBuild",
        "number": 11,
        "url": "http://localhost:8080/job/Project/job/Repository/job/Non%20Parameterized%20Branch/11/"
    }
}`;

    const actual = await testCreateBuildableItem(json);

    assert.equal(actual.blocked, false);
    assert.equal(actual.buildable, false);
    assert.equal(actual.stuck, false);
    assert.equal(actual.cancelled, false);
    assert.isNotNull(actual.executable);
    assert.equal(actual.executable.url, "http://localhost:8080/job/Project/job/Repository/job/Non%20Parameterized%20Branch/11/");
});
