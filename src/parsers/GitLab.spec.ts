import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { GitLab } from "./GitLab";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new GitLab();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("link to project", () => {
    const html: string = `
<html>
<head>
    <meta content="GitLab" property="og:site_name">
    <meta content="A multiplatform Matrix messenger SDK using Trixnity." property="og:description">
</head>
<body
    data-group="trixnity-messenger"
    data-group-full-path="connect2x/trixnity-messenger"
    data-namespace-id="76644306"
    data-page="projects:show"
    data-page-type-id="trixnity-messenger"
    data-project="trixnity-messenger"
    data-project-full-path="connect2x/trixnity-messenger/trixnity-messenger"
    data-project-id="47538655"
    data-project-studio-available="false"
    data-project-studio-enabled="false"
    >
</body>
</html>
`;
    const actual = testParseLink(
        html,
        "https://gitlab.com/connect2x/trixnity-messenger/trixnity-messenger"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://gitlab.com/connect2x/trixnity-messenger/trixnity-messenger"
    );
    assert.equal(
        actual?.text,
        "connect2x/trixnity-messenger/trixnity-messenger: A multiplatform Matrix messenger SDK using Trixnity."
    );
});

test("link to issue, has page-type-id", () => {
    const html: string = `
<html>
<head>
    <meta content="GitLab" property="og:site_name">
    <meta content="A multiplatform Matrix messenger SDK using Trixnity." property="og:description">
    <meta content="Room name &amp; topic are not accessible (#686) · Issues · connect2x / Trixnity Messenger / Trixnity Messenger · GitLab" property="og:title">
</head>
<body
    data-group="trixnity-messenger"
    data-group-full-path="connect2x/trixnity-messenger"
    data-namespace-id="76644306"
    data-page="projects:issues:show"
    data-page-type-id="686"
    data-project="trixnity-messenger"
    data-project-full-path="connect2x/trixnity-messenger/trixnity-messenger"
    data-project-id="47538655"
    data-project-studio-available="false"
    data-project-studio-enabled="false"
    >
    <li class="gl-breadcrumb-item gl-breadcrumb-item-sm">
        <a
            href="/connect2x/trixnity-messenger/trixnity-messenger/-/issues/686"
            aria-current="page"
            class="router-link-exact-active router-link-active"
            >
            <!---->
            <span class="gl-align-middle">#686</span>
        </a>
    </li>
    <div
        data-testid="work-item-type"
        class="@sm/panel:!gl-block gl-w-full"
        >
        <h1
            data-testid="work-item-title"
            class="gl-heading-1 !gl-m-0 gl-w-full gl-wrap-anywhere"
            >
            <span>Room name &amp; topic are not accessible</span>
        </h1>
    </div>
</body>
</html>
`;
    const actual = testParseLink(
        html,
        "https://gitlab.com/connect2x/trixnity-messenger/trixnity-messenger/-/issues/686"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://gitlab.com/connect2x/trixnity-messenger/trixnity-messenger/-/issues/686"
    );
    assert.equal(
        actual?.text,
        "connect2x/trixnity-messenger/trixnity-messenger#686: " +
            "Room name & topic are not accessible"
    );
});

test("link to issue, no page-type-id", () => {
    // it looks like page-type-id wasn't part of version 18.1
    const html: string = `
<html>
<head>
    <meta content="GitLab" property="og:site_name">
    <meta content="Some other project" property="og:description">
    <meta content="Wash the dishes (#1) · Issues · internal-projects / demo · GitLab" property="og:title">
</head>
<body
    data-group="internal-projects"
    data-group-full-path="internal-projects"
    data-namespace-id="14"
    data-page="projects:work_items:show"
    data-project="demo"
    data-project-full-path="internal-projects/demo"
    data-project-id="33"
    >
    <a
        href="/internal-projects/demo/-/issues/1"
        aria-current="page"
        class="router-link-exact-active router-link-active"
        >
        <!---->
        <span class="gl-align-middle">#1</span>
    </a>
    <h1
        data-testid="work-item-title"
        class="gl-heading-1 !gl-m-0 gl-w-full gl-wrap-anywhere"
        >
        <span>Wash the dishes</span>
    </h1>
</body>
</html>
`;
    const actual = testParseLink(
        html,
        "http://example.com/internal-projects/demo/-/issues/1"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://example.com/internal-projects/demo/-/issues/1"
    );
    assert.equal(
        actual?.text,
        "internal-projects/demo#1: " +
            "Wash the dishes"
    );
});

test("link to merge request, with page-type-id", () => {
    const html: string = `
<html>
<head>
    <meta content="GitLab" property="og:site_name">
    <meta content="Fix #686: Room name &amp; topic are not accessible (!672) · Merge requests · connect2x / Trixnity Messenger / Trixnity Messenger · GitLab" property="og:title">
    <meta content=" Developer:    CLA signed (only needed when external..." property="og:description">
</head>
<body
    class="tab-width-8 gl-browser-firefox gl-platform-windows body-fixed-scrollbar page-initialised" 
    data-group="trixnity-messenger"
    data-group-full-path="connect2x/trixnity-messenger"
    data-namespace-id="76644306"
    data-page="projects:merge_requests:show"
    data-page-type-id="672"
    data-project="trixnity-messenger"
    data-project-full-path="connect2x/trixnity-messenger/trixnity-messenger"
    data-project-id="47538655"
    data-project-studio-available="false"
    data-project-studio-enabled="false">
    <li class="gl-breadcrumb-item gl-breadcrumb-item-sm">
        <a
            href="/connect2x/trixnity-messenger/trixnity-messenger/-/merge_requests/672"
            aria-current="page"
            class=""
            >
            <!---->
            <span class="gl-align-middle">!672</span>
        </a>
    </li>
    <h1
        class="title gl-heading-1 gl-self-center gl-mb-0 gl-flex-1 gl-wrap-anywhere"
        data-testid="title-content"
        >
        Fix <a
                href="/connect2x/trixnity-messenger/trixnity-messenger/-/issues/686"
                title="Room name &amp; topic are not accessible"
                class="gfm gfm-issue"
                data-original="#686"
                data-link="false"
                data-link-reference="false"
                data-issue="175697525"
                data-project="47538655"
                data-iid="686"
                data-namespace-path="connect2x/trixnity-messenger/trixnity-messenger"
                data-project-path="connect2x/trixnity-messenger/trixnity-messenger"
                data-issue-type="issue"
                data-container="body"
                data-placement="top"
                data-reference-type="issue"
                >#686</a>: Room name &amp; topic are not accessible
    </h1>
</body>
</html>
`;
    const actual = testParseLink(
        html,
        "https://gitlab.com/connect2x/trixnity-messenger/trixnity-messenger/-/merge_requests/672"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://gitlab.com/connect2x/trixnity-messenger/trixnity-messenger/-/merge_requests/672"
    );
    assert.equal(
        actual?.text,
        "connect2x/trixnity-messenger/trixnity-messenger!672: " +
            "Fix #686: Room name & topic are not accessible"
    );
});

test("link to merge request, no page-type-id", () => {
    const html: string = `
<html>
<head>
    <meta content="GitLab" property="og:site_name">
    <meta content="GitLab Enterprise Edition" name="description">
</head>
<body
    class="tab-width-4 gl-browser-firefox gl-platform-windows body-fixed-scrollbar page-initialised" 
    data-group="internal-projects"
    data-group-full-path="internal-projects"
    data-namespace-id="14"
    data-page="projects:merge_requests:show"
    data-page-type-id="1"
    data-project="demo"
    data-project-full-path="internal-projects/demo"
    data-project-id="33"
    >
    <a
        href="/internal-projects/demo/-/merge_requests/1"
        aria-current="page"
        class="">
        <!---->
        <span class="gl-align-middle">!1</span>
    </a>
    <h1
        class="title gl-heading-1 gl-self-center gl-mb-0 gl-flex-1"
        data-testid="title-content"
        >
        doc: radically simplify README
    </h1>
</body>
</html>
`;
    const actual = testParseLink(
        html,
        "http://hostname/internal-projects/demo/-/merge_requests/1"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://hostname/internal-projects/demo/-/merge_requests/1"
    );
    assert.equal(
        actual?.text,
        "internal-projects/demo!1: doc: radically simplify README"
    );
});

test("link to wiki page, with page-type-id", () => {
    const html: string = `
<html>
<head>
    <meta content="GitLab" property="og:site_name">
    <meta content="GitLab Enterprise Edition" name="description">
</head>
<body
    class="tab-width-4 body-fixed-scrollbar page-initialised" 
    data-group="internal-projects"
    data-group-full-path="internal-projects"
    data-namespace-id="14"
    data-page="projects:wikis:show"
    data-page-type-id="Electric-Sunlight-Orchestra"
    data-project="demo"
    data-project-full-path="internal-projects/demo"
    data-project-id="33"
    >
    <a
        href="/internal-projects/demo/-/wikis/Electric-Sunlight-Orchestra"
        aria-current="page"
        class=""
        >
        <!---->
        <span
            class="gl-align-middle"
            >
            Electric-Sunlight-Orchestra
        </span>
    </a>
    <h1
        data-testid="page-heading"
        class="gl-heading-1 !gl-m-0"
        >
        Electric Sunlight Orchestra
    </h1>
</body>
</html>
`;
    const actual = testParseLink(
        html,
        "http://host/internal-projects/demo/-/wikis/Electric-Sunlight-Orchestra"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "http://host/internal-projects/demo/-/wikis/Electric-Sunlight-Orchestra"
    );
    assert.equal(
        actual?.text,
        "internal-projects/demo: Electric Sunlight Orchestra"
    );
});
