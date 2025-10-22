import {assert, test} from "vitest";
import {JSDOM} from "jsdom";
import {Link} from "../Link";
import {Parser} from "../Parser";
import {GitLab} from "./GitLab";

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
