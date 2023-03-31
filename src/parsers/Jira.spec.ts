import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { Jira } from "./Jira";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new Jira();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("should parse a simple issue page", () => {
    const html = `
<html>
    <head>
        <title>[DO-8731] GitHub PR comment bodies are fully rendered - Jira</title>
    </head>
    <body>
        <div id="page">
            <div id="content">
                <div class="aui-page-panel">
                    <!-- etc., etc... -->
                    <h1 id="summary-val">GitHub PR comment bodies are fully rendered</h1>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://jira.example.com/browse/DO-8731"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://jira.example.com/browse/DO-8731"
    );
    assert.equal(
        actual?.text,
        "DO-8731: GitHub PR comment bodies are fully rendered"
    );
});

test("should parse an issue page hosted under a folder", () => {
    const html = `
<html>
    <head>
        <title>[HTTPCLIENT-1763] Invalid 'expires' attribute - ASF JIRA</title>
        <link rel="search" type="application/opensearchdescription+xml" href="/jira/osd.jsp" title="[HTTPCLIENT-1763] Invalid 'expires' attribute - ASF JIRA">
    </head>
    <body>
        <div id="page">
            <div id="content">
                <div class="aui-page-panel">
                    <!-- etc., etc... -->
                    <h1 id="summary-val">Invalid 'expires' attribute</h1>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://issues.apache.org/jira/browse/HTTPCLIENT-1763"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://issues.apache.org/jira/browse/HTTPCLIENT-1763"
    );
    assert.equal(
        actual?.text,
        "HTTPCLIENT-1763: Invalid 'expires' attribute"
    );
});

test("should parse an issue page hosted under many folders", () => {
    const html = `
<html>
    <head>
        <title>[HTTPCLIENT-1763] Invalid 'expires' attribute - ASF JIRA</title>
        <link rel="search" type="application/opensearchdescription+xml" href="/jira/osd.jsp" title="[HTTPCLIENT-1763] Invalid 'expires' attribute - ASF JIRA">
    </head>
    <body>
        <div id="page">
            <div id="content">
                <div class="aui-page-panel">
                    <!-- etc., etc... -->
                    <h1 id="summary-val">Invalid 'expires' attribute</h1>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://issues.apache.org/jira/path/prefix/browse/HTTPCLIENT-1763"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://issues.apache.org/jira/path/prefix/browse/HTTPCLIENT-1763"
    );
    assert.equal(
        actual?.text,
        "HTTPCLIENT-1763: Invalid 'expires' attribute"
    );
});

test("should parse a title from a custom JIRA deployment", () => {
    const html = `
<html>
    <head>
        <title>[JENKINS-69135] Add a &quot;Versions to include&quot; field to the Global Library Cache feature - Jenkins Jira</title>
    </head>
    <body>
        <div id="page">
            <div id="content">
                <div class="aui-page-panel">
                    <!-- etc., etc... -->
                    <h1 id="summary-val">Add a &quot;Versions to include&quot; field to the Global Library Cache feature</h1>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://issues.jenkins.io/browse/JENKINS-69135"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://issues.jenkins.io/browse/JENKINS-69135"
    );
    assert.equal(
        actual?.text,
        "JENKINS-69135: Add a \"Versions to include\" field to the Global Library Cache feature"
    );
});

test("should parse a title without the word jira in it", () => {
    const html = `
<html>
    <body
        id="jira"
        class="aui-layout aui-theme-default   aui-page-sidebar aui-sidebar-collapsed page-type-split page-issue-navigator page-type-navigator"
        data-version="8.20.12"
        data-aui-version="9.2.3-4dc984d9f"
        >
        <title>[BSERV-12252] Disable wordwrap in Pull Request diff view - Create and track feature requests for Atlassian products.</title>
        <div id="page">
            <div id="content">
                <div class="aui-page-panel">
                    <!-- etc., etc... -->
                    <h1 id="summary-val">Disable wordwrap in Pull Request diff view</h1>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://jira.atlassian.com/browse/BSERV-12252"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://jira.atlassian.com/browse/BSERV-12252"
    );
    assert.equal(
        actual?.text,
        "BSERV-12252: Disable wordwrap in Pull Request diff view"
    );
});
