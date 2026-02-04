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
        "#jenkins-build-history a.app-builds-container__item__inner__link"
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
        "#jenkins-build-history a.app-builds-container__item__inner__link"
    );
});

test("parsePage job at 2.387.1", () => {
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

    const element = getBodyElement(html);
    const actual = JenkinsHelpers.parsePage(
        element,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/"
    );

    const actualCrumbs = actual.crumbs;
    assert.equal(actualCrumbs.length, 4);
    assert.equal(actualCrumbs[0].href, "/");
    assert.equal(actualCrumbs[1].href, "/job/Project/");
    assert.equal(actualCrumbs[2].href, "/job/Project/job/Repository/");
    assert.equal(actualCrumbs[3].href, "/job/Project/job/Repository/job/Branch/");
});

test("parsePage run at 2.387.1", () => {
    const html = `
<html>
    <head>
        <title>Project » Repository » Branch #2 [Jenkins]</title>
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

    const element = getBodyElement(html);
    const actual = JenkinsHelpers.parsePage(
        element,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/2/"
    );

    const actualCrumbs = actual.crumbs;
    assert.equal(actualCrumbs.length, 5);
    assert.equal(actualCrumbs[0].href, "/");
    assert.equal(actualCrumbs[1].href, "/job/Project/");
    assert.equal(actualCrumbs[2].href, "/job/Project/job/Repository/");
    assert.equal(actualCrumbs[3].href, "/job/Project/job/Repository/job/Branch/");
    assert.equal(actualCrumbs[4].href, "/job/Project/job/Repository/job/Branch/2/");
});

test("parsePage run's specific step at 2.387.1", () => {
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

    const element = getBodyElement(html);
    const actual = JenkinsHelpers.parsePage(
        element,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/execution/node/5/"
    );

    const actualCrumbs = actual.crumbs;
    assert.equal(actualCrumbs.length, 6);
    assert.equal(actualCrumbs[0].href, "/");
    assert.equal(actualCrumbs[1].href, "/job/Project/");
    assert.equal(actualCrumbs[2].href, "/job/Project/job/Repository/");
    assert.equal(actualCrumbs[3].href, "/job/Project/job/Repository/job/Branch/");
    assert.equal(actualCrumbs[4].href, "/job/Project/job/Repository/job/Branch/1/");
    assert.equal(actualCrumbs[5].href, "/job/Project/job/Repository/job/Branch/1/execution/node/5/");
});

test("parsePage job at 2.516.3", () => {
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

    const element = getBodyElement(html);
    const actual = JenkinsHelpers.parsePage(
        element,
        "http://localhost:8080/job/ALPHA/"
    );

    const actualCrumbs = actual.crumbs;
    assert.equal(actualCrumbs.length, 2);
    assert.equal(actualCrumbs[0].href, "/");
    assert.equal(actualCrumbs[1].href, "/job/ALPHA/");
});

test("parsePage dashboard at 2.516.3", () => {
    const html = `
<html>
    <head>
        <title>Dashboard - Jenkins</title>
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
                    </ol>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const element = getBodyElement(html);
    const actual = JenkinsHelpers.parsePage(
        element,
        "http://localhost:8080"
    );

    const actualCrumbs = actual.crumbs;
    assert.equal(actualCrumbs.length, 1);
    assert.equal(actualCrumbs[0].href, "/");
});

test("parsePage job at 2.528.3", () => {
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

    const element = getBodyElement(html);
    const actual = JenkinsHelpers.parsePage(
        element,
        "http://localhost:8080/job/org-name/"
    );

    const actualCrumbs = actual.crumbs;
    assert.equal(actualCrumbs.length, 2);
    assert.equal(actualCrumbs[0].href, "/");
    assert.equal(actualCrumbs[1].href, "/job/org-name/");
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
