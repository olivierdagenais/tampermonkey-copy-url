import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { Jenkins } from "./Jenkins";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new Jenkins();

    const actual: Link | null = cut.parseLink(document, url);
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
            </ol>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/"
    );
    assert.equal(actual?.text, "Project » Repository » Branch");
});

test("run page", () => {
    const html = `
<html>
    <head>
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

    const actual = testParseLink(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/"
    );
    assert.equal(actual?.text, "Project » Repository » Branch #1");
});

test("run's console output", () => {
    const html = `
<html>
    <head>
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

    const actual = testParseLink(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/console"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/console"
    );
    assert.equal(
        actual?.text,
        "Project » Repository » Branch #1 » Console Output"
    );
});

test("run page, version 2.361.4", () => {
    const html = `
<html>
    <head>
        <title>ALPHA » bravo » charlie » delta #106 [Jenkins]</title>
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
                    <a href="/job/ALPHA/" class="model-link">
                        ALPHA
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/ALPHA/" class="children"></li>
                <li class="item">
                    <a href="/job/ALPHA/job/bravo/" class="model-link">
                        bravo
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/ALPHA/job/bravo/" class="children"></li>
                <li class="item">
                    <a href="/job/ALPHA/job/bravo/job/charlie/" class="model-link">
                        charlie
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/ALPHA/job/bravo/job/charlie/" class="children"></li>
                <li class="item">
                    <a href="/job/ALPHA/job/bravo/job/charlie/job/delta/" class="model-link">
                        delta
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li href="/job/ALPHA/job/bravo/job/charlie/job/delta/" class="children"></li>
                <li class="item">
                    <a href="/job/ALPHA/job/bravo/job/charlie/job/delta/106/" class="model-link">
                        #106
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li class="separator"></li>
            </ul>
            <div id="breadcrumb-menu-target"></div>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "http://localhost:8080/job/ALPHA/job/bravo/job/charlie/job/delta/106/"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://localhost:8080/job/ALPHA/job/bravo/job/charlie/job/delta/106/"
    );
    assert.equal(actual?.text, "ALPHA » bravo » charlie » delta #106");
});

test("run's Pipeline steps", () => {
    const html = `
<html>
    <head>
        <title>Project » Repository » Branch #1 Pipeline steps [Jenkins]</title>
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
                <li class="jenkins-breadcrumbs__list-item">
                    <a
                        href="/job/Project/job/Repository/job/Branch/1/flowGraphTable/"
                        class=""
                        >
                        Pipeline Steps
                    </a>
                </li>
                <li class="separator"></li>
            </ol>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/flowGraphTable/"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/flowGraphTable/"
    );
    assert.equal(
        actual?.text,
        "Project » Repository » Branch #1 » Pipeline Steps"
    );
});

test("run's specific step", () => {
    const html = `
<html>
    <head>
        <title>Project » Repository » Branch #1 Pipeline steps [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.387.1"
        data-version="2.387.1"
        >
        <!-- etc., etc... -->
        <div id="breadcrumbBar" class="jenkins-breadcrumbs" aria-label="breadcrumb">
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
                    <a
                        href="/job/Project/job/Repository/job/Branch/"
                        class="model-link">
                        Branch
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li
                    href="/job/Project/job/Repository/job/Branch/"
                    class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a
                        href="/job/Project/job/Repository/job/Branch/1/"
                        class="model-link">
                        #1
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li class="separator"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a
                        href="/job/Project/job/Repository/job/Branch/1/execution/node/5/"
                        class="model-link">
                        Stage : Start
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li class="separator"></li>
            </ol>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/execution/node/5/"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/execution/node/5/"
    );
    assert.equal(
        actual?.text,
        "Project » Repository » Branch #1 » Stage : Start"
    );
});

test("run's specific step's console output", () => {
    const html = `
<html>
    <head>
        <title>Project » Repository » Branch #1 Pipeline steps [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.387.1"
        data-version="2.387.1"
        >
        <!-- etc., etc... -->
        <div id="breadcrumbBar" class="jenkins-breadcrumbs" aria-label="breadcrumb">
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
                    <a
                        href="/job/Project/job/Repository/job/Branch/"
                        class="model-link">
                        Branch
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li
                    href="/job/Project/job/Repository/job/Branch/"
                    class="children"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a
                        href="/job/Project/job/Repository/job/Branch/1/"
                        class="model-link">
                        #1
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li class="separator"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a
                        href="/job/Project/job/Repository/job/Branch/1/execution/node/5/"
                        class="model-link">
                        Stage : Start
                        <span class="jenkins-menu-dropdown-chevron"></span>
                    </a>
                </li>
                <li class="separator"></li>
                <li class="jenkins-breadcrumbs__list-item">
                    <a
                        href="/job/Project/job/Repository/job/Branch/1/execution/node/5/log/"
                        class="">
                        Console Output
                    </a>
                </li>
                <li class="separator"></li>
            </ol>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/execution/node/5/log/"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/execution/node/5/log/"
    );
    assert.equal(
        actual?.text,
        "Project » Repository » Branch #1 » Stage : Start » Console Output"
    );
});
