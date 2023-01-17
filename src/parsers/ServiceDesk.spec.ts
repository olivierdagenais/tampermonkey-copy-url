import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { ServiceDesk } from "./ServiceDesk";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new ServiceDesk();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("should parse a simple request page", () => {
    const html = `
<html>
    <body id="body">
        <title>ManageEngine ServiceDesk Plus</title>
        <div id="main">
            <div id="content">
                <div id="content-inner">
                    <!-- etc., etc... -->
                    <span id="request-id" data-cs-field="req_id" class="mr5 fl">#128701</span>
                    <span data-cs-field="req_subject" id="req_subject">Configure system A to forward logs to ELK</span>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://servicedesk.example.com/WorkOrder.do?woMode=viewWO&woID=128701"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://servicedesk.example.com/WorkOrder.do?woMode=viewWO&woID=128701"
    );
    assert.equal(
        actual?.text,
        "ServiceDesk #128701: Configure system A to forward logs to ELK"
    );
});
