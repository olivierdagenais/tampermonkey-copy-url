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
