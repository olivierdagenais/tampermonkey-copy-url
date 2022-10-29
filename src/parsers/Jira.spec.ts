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

test("TODO", () => {});
