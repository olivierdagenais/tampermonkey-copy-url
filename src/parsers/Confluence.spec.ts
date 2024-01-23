import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { Confluence } from "./Confluence";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new Confluence();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("should parse a simple page", () => {
    const html = `
<html>
    <head>
        <title>Supported AWS Objects - Cloudaware Documentation (Public) - Confluence</title>
        <meta name="ajs-page-title" content="Supported AWS Objects">
    </head>
    <body
        id="com-atlassian-confluence"
        class="theme-default dashboard aui-layout aui-theme-default"
    >
        <div class="PageContent">
            <!-- etc., etc. -->
            <h1
                id="title-text"
                data-test-id="title-text"
                data-testid="title-text"
                style="color: rgb(23, 43, 77);"
                class="css-1agkp1r e1vqopgf1"
            >
                Supported AWS Objects
            </h1>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://cloudaware.atlassian.net/wiki/spaces/DOCS/pages/3190554625/Supported+AWS+Objects"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://cloudaware.atlassian.net/wiki/spaces/DOCS/pages/3190554625/Supported+AWS+Objects"
    );
    assert.equal(actual?.text, "Supported AWS Objects");
});

test("should parse a page about Confluence in Confluence", () => {
    const html = `
<html>
    <head>
        <title>
            Create and Edit Pages - Confluence Documentation - Confluence
        </title>
        <meta name="ajs-page-title" content="Create and Edit Pages">
        <meta name="ajs-latest-published-page-title" content="Create and Edit Pages">
        <link rel="canonical" href="https://confluence.columbia.edu/confluence/display/CONFDOCS/Create+and+Edit+Pages">
        <link rel="shortlink" href="https://confluence.columbia.edu/confluence/x/14KCCg">
        <meta name="wikilink" content="[CONFDOCS:Create and Edit Pages]">
    </head>
    <body
        id="com-atlassian-confluence"
        class="theme-default  aui-layout aui-theme-default synchrony-active"
        data-aui-version="9.2.2"
    >
        <div id="page">
            <!-- etc.. -->
            <h1 id="title-text" class="with-breadcrumbs">
                <a href="/confluence/display/CONFDOCS/Create+and+Edit+Pages">
                    Create and Edit Pages
                </a>
            </h1>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://confluence.columbia.edu/confluence/display/CONFDOCS/Create+and+Edit+Pages"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://confluence.columbia.edu/confluence/x/14KCCg"
    );
    assert.equal(actual?.text, "Create and Edit Pages");
});
