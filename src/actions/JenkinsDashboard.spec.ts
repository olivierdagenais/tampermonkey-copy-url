import { assert, test } from "vitest";
import { JenkinsDashboard } from "./JenkinsDashboard";
import { JSDOM } from "jsdom";

function testNavigate(html: string, url: string): string | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut = new JenkinsDashboard();

    const actual = cut.navigate(document, url);
    return actual;
}
