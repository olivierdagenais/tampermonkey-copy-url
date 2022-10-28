import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { Bitbucket } from "./Bitbucket";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new Bitbucket();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("should parse a simple Bitbucket pull request page", () => {
    const html = `
<html>
    <head>
        <title>Pull Request #4: DO-8731: fix: sanitize GitHub PR comment bodies - Stash</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/pull-requests/4/overview"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/pull-requests/4/overview"
    );
    assert.equal(
        actual?.text,
        "TP/jf_agent#4: DO-8731: fix: sanitize GitHub PR comment bodies"
    );
});
