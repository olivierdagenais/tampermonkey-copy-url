import { assert, test } from "vitest";
import { JenkinsConsole } from "./JenkinsConsole";
import { JSDOM } from "jsdom";

function testNavigate(html: string, url: string): string | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut = new JenkinsConsole();

    const actual = cut.navigate(document, url);
    return actual;
}

test("job page before 2.463", () => {
    const html = `
<html>
    <head>
        <title>Project » Repository » Branch [Jenkins]</title>
    </head>
    <body
        data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
        id="jenkins"
        class="yui-skin-sam two-column jenkins-2.361.4"
        data-version="2.361.4"
        >
        <!-- etc., etc... -->
        <div class="row pane-content">
            <div id="properties" page-next-build="3"></div>
            <table class="pane jenkins-pane stripped">
                <tbody>
                    <tr class="build-search-row">
                        <td>
                            <!-- Ommitted for brevity -->
                        </td>
                    </tr>
                    <tr
                        page-entry-id="-9223372036854775805"
                        class="build-row transitive single-line overflow-checked"
                        >
                        <td class="build-row-cell">
                            <div class="pane build-name" style="height: 36px">
                                <div class="build-icon">
                                    <a
                                        href="/job/Project/job/Repository/job/Branch/3/console"
                                        class="build-status-link"
                                        >
                                        <span
                                            style="width: 16px; height: 16px"
                                            class="build-status-icon__wrapper icon-blue-anime icon-sm"
                                            >
                                            <span class="build-status-icon__outer">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    tooltip="In progress &amp;gt; Console Output"
                                                    focusable="false"
                                                    class="svg-icon"
                                                    >
                                                    <use
                                                        href="/images/build-status/build-status-sprite.svg#build-status-in-progress"
                                                        >
                                                    </use>
                                                </svg>
                                            </span>
                                            <svg
                                                viewBox="0 0 24 24"
                                                tooltip="In progress &amp;gt; Console Output"
                                                focusable="false"
                                                class="svg-icon icon-blue-anime icon-sm">
                                                <use
                                                    href="/static/03a6ead6/images/build-status/build-status-sprite.svg#last-successful"
                                                    >
                                                </use>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <a
                                    update-parent-class=".build-row"
                                    href="/job/Project/job/Repository/job/Branch/3/"
                                    class="model-link inside build-link display-name"
                                    >
                                    #3
                                    <span class="jenkins-menu-dropdown-chevron"></span>
                                </a>
                            </div>
                            <div
                                time="1682038274247"
                                class="pane build-details"
                                style="height: 36px"
                                >
                                <a
                                    update-parent-class=".build-row"
                                    tooltip=""
                                    href="/job/Project/job/Repository/job/Branch/3/"
                                    class="model-link inside build-link"
                                    >
                                    Apr 21, 2023, 12:51 AM
                                    <span class="jenkins-menu-dropdown-chevron"></span>
                                </a>
                                <table
                                    tooltip="Started 2 min 46 sec ago<br> Estimated remaining time: N/A"
                                    style="cursor: pointer"
                                    href="/job/Project/job/Repository/job/Branch/3/console"
                                    class="progress-bar red"
                                    title="Started 2 min 46 sec ago<br> Estimated remaining time: N/A"
                                    >
                                    <tbody>
                                        <tr>
                                            <td
                                                style="width: 99%"
                                                class="progress-bar-done">
                                            </td>
                                            <td
                                                style="width: 1%"
                                                class="progress-bar-left">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="pane build-controls">
                                <div
                                    class="middle-align build-badge"
                                    style="width: 37px"></div>
                                <div class="build-stop" style="width: 24px">
                                    <a
                                        data-confirm="Are you sure you want to abort Project » Repository » Branch #3?"
                                        href="/job/Project/job/Repository/job/Branch/3/stop"
                                        class="stop-button-link"
                                        >
                                        <img
                                            src="/static/03a6ead6/images/svgs/stop.svg"
                                            alt="[cancel]"
                                            style="width: 16px; height: 16px"
                                            class="icon-stop icon-sm"
                                            />
                                    </a>
                                </div>
                            </div>
                            <div class="left-bar"></div>
                        </td>
                    </tr>
                    <tr
                        page-entry-id="-9223372036854775806"
                        class="build-row single-line overflow-checked"
                        >
                        <td class="build-row-cell">
                            <div class="pane build-name">
                                <div class="build-icon">
                                    <a
                                        href="/job/Project/job/Repository/job/Branch/2/console"
                                        class="build-status-link"
                                        >
                                        <span
                                            style="width: 16px; height: 16px"
                                            class="build-status-icon__wrapper icon-blue icon-sm"
                                            >
                                            <span class="build-status-icon__outer">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    tooltip="Success &amp;gt; Console Output"
                                                    focusable="false"
                                                    class="svg-icon"
                                                    >
                                                    <use
                                                        href="/images/build-status/build-status-sprite.svg#build-status-static"
                                                        >
                                                    </use>
                                                </svg>
                                            </span>
                                            <svg
                                                viewBox="0 0 24 24"
                                                tooltip="Success &amp;gt; Console Output"
                                                focusable="false"
                                                class="svg-icon icon-blue icon-sm"
                                                >
                                                <use
                                                    href="/static/03a6ead6/images/build-status/build-status-sprite.svg#last-successful"
                                                    >
                                                </use>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <a
                                    update-parent-class=".build-row"
                                    href="/job/Project/job/Repository/job/Branch/2/"
                                    class="model-link inside build-link display-name"
                                    >
                                    #2
                                    <span class="jenkins-menu-dropdown-chevron"></span>
                                </a>
                            </div>
                            <div time="1681520726115" class="pane build-details">
                                <a
                                    update-parent-class=".build-row"
                                    tooltip="Took 1.6 sec"
                                    href="/job/Project/job/Repository/job/Branch/2/"
                                    class="model-link inside build-link"
                                    title="Took 1.6 sec"
                                    >
                                    Apr 15, 2023, 1:05 AM
                                    <span class="jenkins-menu-dropdown-chevron"></span>
                                </a>
                            </div>
                            <div class="pane build-controls">
                                <div
                                    class="middle-align build-badge"
                                    style="width: 100%"
                                    >
                                </div>
                            </div>
                            <div class="left-bar"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</html>`;

    const actual = testNavigate(
        html,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/"
    );

    assert.equal(
        actual,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/3/consoleFull"
    );
});

test("job page at or after 2.463", () => {
    const html = `
<html>
  <head>
    <title>Project » Repository » Branch [Jenkins]</title>
  </head>
  <body
    data-model-type="org.jenkinsci.plugins.workflow.job.WorkflowRun"
    id="jenkins"
    class="yui-skin-sam two-column jenkins-2.463"
    data-version="2.463"
    >
    <!-- etc., etc... -->
    <div
      id="jenkins-build-history"
      class="app-builds-container__items"
      >
      <div
        data-page-entry-newest="-9223372036854775805"
        data-page-has-up="false"
        data-page-has-down="false"
        data-page-entry-oldest="-9223372036854775807"
        >
        <span class="app-builds-container__heading">Today</span>
        <div
          page-entry-id="-9223372036854775805"
          class="app-builds-container__item"
          >
          <a
            data-tooltip-append-to-parent="true"
            tooltip="In progress"
            href="/job/Project/job/Repository/job/Branch/3/console"
            class="app-builds-container__item__icon"
            title="In progress"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              viewBox="-256 -256 512 512"
              >
              (...)
            </svg>
          </a>
          <div class="app-builds-container__item__inner">
            <a
              href="/job/Project/job/Repository/job/Branch/3/"
              class="app-builds-container__item__inner__link"
              >
              #3
              <span
                time="1733687566047"
                class="app-builds-container__item__time"
                >
                <div
                  data-tooltip-append-to-parent="true"
                  >
                  7:52 PM
                </div>
              </span>
            </a>
            <div class="app-builds-container__item__inner__controls">
              <a
                class="app-progress-bar app-progress-bar--error"
                href="/job/Project/job/Repository/job/Branch/3/console"
                tooltip="Started 30 sec ago
    Estimated remaining time: N/A"
                data-tooltip-append-to-parent="true"
                id=""
                data-tooltip-template="Started %0 ago
    Estimated remaining time: %1"
                title="Started 30 sec ago
    Estimated remaining time: N/A"
                >
                <span style="width: 99%"></span>
              </a>
              <a
                data-tooltip-append-to-parent="true"
                tooltip="Cancel"
                data-confirm="Are you sure you want to abort tcu 79 #3?"
                href="/job/Project/job/Repository/job/Branch/3/stop"
                class="stop-button-link"
                title="Cancel"
                >
                <span class="jenkins-visually-hidden">Cancel</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  viewBox="0 0 512 512"
                  >
                  (...)
                </svg>
              </a>
            </div>
          </div>
          <button
            class="jenkins-card__reveal jenkins-jumplist-link"
            data-href="/job/Project/job/Repository/job/Branch/3/"
            aria-expanded="false"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              viewBox="0 0 512 512"
              >
              (...)
            </svg>
          </button>
        </div>
        <span class="app-builds-container__heading">December 7, 2024</span>
        <div
          page-entry-id="-9223372036854775806"
          class="app-builds-container__item"
          >
          <a
            data-tooltip-append-to-parent="true"
            tooltip="Success"
            href="/job/Project/job/Repository/job/Branch/2/console"
            class="app-builds-container__item__icon"
            title="Success"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              viewBox="0 0 512 512"
              >
              (...)
            </svg
          >
          </a>
          <div class="app-builds-container__item__inner">
            <a
              href="/job/Project/job/Repository/job/Branch/2/"
              class="app-builds-container__item__inner__link"
              >
              #2
              <span
                time="1733596477775"
                class="app-builds-container__item__time"
                >
                <div
                  data-tooltip-append-to-parent="true"
                  tooltip="Took 0.59 sec"
                  title="Took 0.59 sec"
                  >
                  6:34 PM
                </div>
              </span>
            </a>
            <div class="app-builds-container__item__inner__controls"></div>
          </div>
          <button
            class="jenkins-card__reveal jenkins-jumplist-link"
            data-href="/job/Project/job/Repository/job/Branch/2/"
            aria-expanded="false"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              viewBox="0 0 512 512"
              >
              (...)
            </svg>
          </button>
        </div>
        <div
          page-entry-id="-9223372036854775807"
          class="app-builds-container__item"
          >
          <a
            data-tooltip-append-to-parent="true"
            tooltip="Success"
            href="/job/Project/job/Repository/job/Branch/1/console"
            class="app-builds-container__item__icon"
            title="Success"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              viewBox="0 0 512 512"
              >
            </svg>
          </a>
          <div class="app-builds-container__item__inner">
            <a
              href="/job/Project/job/Repository/job/Branch/1/"
              class="app-builds-container__item__inner__link"
              >
              #1
              <span time="1733596470813" class="app-builds-container__item__time">
                <div
                  data-tooltip-append-to-parent="true"
                  tooltip="Took 2.3 sec"
                  title="Took 2.3 sec"
                  >
                  6:34 PM
                </div>
              </span>
            </a>
            <div class="app-builds-container__item__inner__controls"></div>
          </div>
          <button
            class="jenkins-card__reveal jenkins-jumplist-link"
            data-href="/job/Project/job/Repository/job/Branch/1/"
            aria-expanded="false"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              viewBox="0 0 512 512"
              >
            </svg>
          </button>
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
        "http://localhost:8080/job/Project/job/Repository/job/Branch/3/consoleFull"
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
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1"
    );

    assert.equal(
        actual,
        "http://localhost:8080/job/Project/job/Repository/job/Branch/1/consoleFull"
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

    assert.equal(actual, null);
});
