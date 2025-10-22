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

// TODO: add tests
test("link to project", () => {

});
