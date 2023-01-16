import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { ServiceNow } from "./ServiceNow";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new ServiceNow();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("should parse an incident created page", () => {
    const html = `
<html>
    <head>
        <title>My Request - INC0031143 - Organization ServiceNow Portal</title>
    </head>
    <body>
        <div>
            <section>
                <main>
                    <!-- etc., etc... -->
                    <div
                        class="form-control no-padder no-border no-bg ng-binding"
                        id="data.number.name"
                    >
                        INC0031143
                    </div>
                    <h2
                        class="inline m-n m-r-sm ng-binding"
                        style="word-break: break-word;"
                        tabindex="-1"
                        id="short-desc"
                    >
                        Some incident summary
                    </h2>
                </div>
            </div>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://example.service-now.com/esc/?id=ticket&is_new_order=true&table=incident&sys_id=81f3736f971065905943fae3a253af68"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://example.service-now.com/esc/?id=ticket&is_new_order=true&table=incident&sys_id=81f3736f971065905943fae3a253af68"
    );
    assert.equal(actual?.text, "INC0031143: Some incident summary");
});

test("should parse a request item page", () => {
    const html = `
<html>
    <head>
        <title>My Request - RITM0028737 - Organization ServiceNow Portal</title>
    </head>
    <body>
        <div>
            <section>
                <main>
                    <!-- etc., etc... -->
                    <div
                        class="form-control no-padder no-border no-bg ng-binding"
                        id="data.number.name"
                    >
                        RITM0028737
                    </div>
                    <h2
                        class="inline m-n m-r-sm ng-binding"
                        style="word-break: break-word;"
                        tabindex="-1"
                        id="short-desc"
                    >
                        For general requests not specified on this page or on the left menu under Categories.
                    </h2>
                    <div id="variables-toggle">
                        <div
                            class="m-b break-word ng-scope"
                            >
                            <label class="m-t-xs m-b-none text-muted">
                                <b class="ng-binding">
                                    Please select the request type
                                </b>
                            </label> 
                            <div ng-if="!variable.multi_row" class="ng-scope">
                                <div ng-switch="variable.type">
                                    <span class="pre-wrap ng-binding ng-scope">
                                        IT Service Request
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="m-b break-word ng-scope"
                            ng-repeat="variable in c.data.variables"
                        > 
                            <label class="m-t-xs m-b-none text-muted">
                                <b class="ng-binding">Subject</b>
                            </label> 
                            <div ng-if="!variable.multi_row" class="ng-scope">
                                <div ng-switch="variable.type"> 
                                    <span
                                        class="pre-wrap ng-binding ng-scope"
                                    >
                                        I am the request subject
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://kinaxis.service-now.com/esc/?id=ticket&table=sc_req_item&sys_id=36c7352a9798ed505943fae3a253af5e&view=sp"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://kinaxis.service-now.com/esc/?id=ticket&table=sc_req_item&sys_id=36c7352a9798ed505943fae3a253af5e&view=sp"
    );
    assert.equal(actual?.text, "RITM0028737: I am the request subject");
});
