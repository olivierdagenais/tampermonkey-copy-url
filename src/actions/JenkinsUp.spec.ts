import { assert, test } from "vitest";
import { JenkinsUp } from "./JenkinsUp";
import { JSDOM } from "jsdom";

function testNavigate(html: string, url: string): string | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut = new JenkinsUp();

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

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/"
    );

    assert.equal(actual, "http://localhost:8080/job/Project/job/Repository/");
});


test("job page, v2.516.3 (issue #115)", () => {
    const html = `
<html>
    <head>
        <title>ALPHA - Jenkins</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowJob"
        id="jenkins"
        data-search-url="/search/suggest"
        data-search-help-url="https://www.jenkins.io/redirect/search-box"
        class="two-column jenkins-2.516.3"
        data-version="2.516.3"
        >
        <!-- etc., etc... -->
        <div class="jenkins-header__main">
            <div class="jenkins-header__navigation">
                <a href="/" class="app-jenkins-logo">
                    <img
                        src="/static/2ca8485b/images/svgs/logo.svg"
                        aria-hidden="true"
                        id="jenkins-head-icon"
                    >
                    <span class="jenkins-mobile-hide">Jenkins</span>
                </a>
                <div
                    id="breadcrumbBar"
                    class="jenkins-breadcrumbs"
                    aria-label="breadcrumb"
                    >
                    <ol class="jenkins-breadcrumbs__list" id="breadcrumbs">
                        <li
                            data-type="breadcrumb-item"
                            class="jenkins-breadcrumbs__list-item"
                            data-has-menu="true"
                            >
                            <a
                                href="/job/ALPHA/"
                                class="hoverable-model-link hoverable-children-model-link"
                                aria-expanded="false"
                                >
                                ALPHA
                            </a>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </body>
</html>`;


    const actual = testNavigate(
        html,
        "http://localhost:8080/job/ALPHA/"
    );

    assert.equal(
        actual,
        "http://localhost:8080/"
    );
});

test("org. folder page, v2.528.3, customized header (issue #119)", () => {
    const html = `
<html>
    <head>
        <title>Repositories (6) [org-name] - Jenkins</title>
    </head>
    <body
        data-model-type="jenkins.branch.OrganizationFolderViewHolder$ViewImpl"
        id="jenkins"
        data-search-url="/search/suggest"
        data-search-help-url="https://www.jenkins.io/redirect/search-box"
        class="two-column jenkins-2.528.3"
        data-version="2.528.3"
        >
        <!-- etc., etc... -->
        <header id="page-header" class="custom-header jenkins-header">
            <div class="ch-section-1">
                <a href="/" class="app-jenkins-logo">
                    <img
                        src="/avatar-cache/d6971caab514f694ff9ebacde0afdd2c.png?size=32x32"
                        alt="[Jenkins]"
                        class="custom-header__image"
                        />
                    <div class="custom-header__text">Jenkins name</div>
                </a>
            </div>
            <div class="ch-section-2 jenkins-header__main">
                <div class="jenkins-header__navigation">
                    <div
                        id="breadcrumbBar"
                        class="jenkins-breadcrumbs"
                        aria-label="breadcrumb"
                        >
                        <ol class="jenkins-breadcrumbs__list" id="breadcrumbs">
                            <li
                                aria-current="page"
                                data-type="breadcrumb-item"
                                class="jenkins-breadcrumbs__list-item"
                                data-has-menu="true"
                                >
                                <span>org-name</span>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="jenkins-header__actions">
                    <!-- We're keeping this here just to show it exists -->
                </div>
            </div>
        </header>
    </body>
</html>`;

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/org-name/"
    );

    assert.equal(
        actual,
        "http://localhost:8080/"
    );
});

test("job's configure page", () => {
    const html = `
<html>
    <head>
        <title>Branch Config [Jenkins]</title>
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

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/configure"
    );

    assert.equal(
        actual,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/"
    );
});

test("job's configure page, v2.516.3", () => {
    const html = `
<html>
    <head>
        <title>charlie Config - Jenkins</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowJob"
        id="jenkins"
        data-search-url="/search/suggest"
        data-search-help-url="https://www.jenkins.io/redirect/search-box"
        class="two-column jenkins-2.516.3"
        data-version="2.516.3"
        >
        <!-- etc., etc... -->
        <div class="jenkins-header__main">
            <div class="jenkins-header__navigation">
                <a href="/" class="app-jenkins-logo">
                    <img
                        src="/static/2ca8485b/images/svgs/logo.svg"
                        aria-hidden="true"
                        id="jenkins-head-icon"
                    >
                    <span class="jenkins-mobile-hide">Jenkins</span>
                </a>
                <div
                    id="breadcrumbBar"
                    class="jenkins-breadcrumbs"
                    aria-label="breadcrumb"
                    >
                    <ol class="jenkins-breadcrumbs__list" id="breadcrumbs">
                        <li
                            data-type="breadcrumb-item"
                            class="jenkins-breadcrumbs__list-item"
                            data-has-menu="true"
                            >
                            <a
                                href="/job/ALPHA/"
                                class="hoverable-model-link hoverable-children-model-link"
                                aria-expanded="false"
                                >
                                ALPHA
                            </a>
                        </li>
                        <li
                            data-type="breadcrumb-item"
                            class="jenkins-breadcrumbs__list-item"
                            data-has-menu="true"
                            >
                            <a
                                href="/job/ALPHA/job/bravo/"
                                class="hoverable-model-link hoverable-children-model-link"
                                aria-expanded="false"
                                >
                                bravo
                            </a>
                        </li>
                        <li
                            data-type="breadcrumb-item"
                            class="jenkins-breadcrumbs__list-item"
                            data-has-menu="true"
                            >
                            <a
                                href="/job/ALPHA/job/bravo/job/charlie/"
                                class="hoverable-model-link hoverable-children-model-link"
                                aria-expanded="false"
                                >
                                charlie
                            </a>
                        </li>
                        <li
                            aria-current="page"
                            data-type="breadcrumb-item"
                            class="jenkins-breadcrumbs__list-item"
                            >
                            <span class="">Configuration</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/ALPHA/job/bravo/job/charlie/configure"
    );

    assert.equal(
        actual,
        "http://localhost:8080/job/ALPHA/job/bravo/job/charlie/"
    );
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
        actual,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/"
    );
});

test("run console page", () => {
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

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/consoleFull"
    );

    assert.equal(
        actual,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/"
    );
});

test("run's specific step", () => {
    const html = `
<html>
    <head>
        <title>Print Message [Jenkins]</title>
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

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/execution/node/5/"
    );

    assert.equal(
        actual,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/flowGraphTable/"
    );
});

test("dashboard page", () => {
    const html = `
<html>
    <head>
        <title>Dashboard [Jenkins]</title>
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

    assert.equal(actual, "http://localhost:8080/");
});

test("system configuration page, v2.516.3", () => {
    const html = `
<html>
    <head>
        <title>System - Jenkins</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowJob"
        id="jenkins"
        data-search-url="/search/suggest"
        data-search-help-url="https://www.jenkins.io/redirect/search-box"
        class="two-column jenkins-2.516.3"
        data-version="2.516.3"
        >
        <!-- etc., etc... -->
        <div class="jenkins-header__main">
            <div class="jenkins-header__navigation">
                <a href="/" class="app-jenkins-logo">
                    <img
                        src="/static/2ca8485b/images/svgs/logo.svg"
                        aria-hidden="true"
                        id="jenkins-head-icon"
                    >
                    <span class="jenkins-mobile-hide">Jenkins</span>
                </a>
                <div
                    id="breadcrumbBar"
                    class="jenkins-breadcrumbs"
                    aria-label="breadcrumb"
                    >
                    <ol class="jenkins-breadcrumbs__list" id="breadcrumbs">
                        <li
                            aria-current="page"
                            id="inpage-nav"
                            data-type="breadcrumb-item"
                            class="jenkins-breadcrumbs__list-item"
                            data-has-menu="true"
                            >
                            <span
                                class="hoverable-model-link"
                                aria-expanded="false"
                                >
                                System
                            </span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testNavigate(html, "http://localhost:8080/configure");

    assert.equal(actual, "http://localhost:8080/");
});
