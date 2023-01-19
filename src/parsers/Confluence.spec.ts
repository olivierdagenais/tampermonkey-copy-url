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
    // TODO: implement test
});
