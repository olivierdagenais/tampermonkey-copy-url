import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { Zabbix } from "./Zabbix";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new Zabbix();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("should parse a graph page", () => {
    const html = `
<html>
    <head>
        <meta name="Author" content="Zabbix SIA">
    </head>
    <body>
        <div class="wrapper">
            <header class="header-title">
                <h1 id="page-title-general">host.example.com: Free disk space on / in %</h1>
            </header>
            <main>
                <div class="filter-space ui-tabs ui-corner-all ui-widget" aria-label="Filter">
                    <form method="get" action="history.php" accept-charset="utf-8" name="zbx_filter">
                        <div style="display: none"></div>
                    </form>
                    <div>
                        <input type="text" id="from" name="from" value="now-2h" maxlength="19">
                        <input type="text" id="to" name="to" value="now-1h" maxlength="19">
                    </div>
                </div>
            </main>
            <footer role="contentinfo">
                Zabbix 6.4.9. © 2001–2023, <a href="https://www.zabbix.com/">Zabbix SIA</a>
            </footer>
        </div>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://zabbix.example.com/history.php?action=showgraph&itemids[]=204159"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://zabbix.example.com/history.php?action=showgraph&itemids%5B%5D=204159&from=now-2h&to=now-1h"
    );
    assert.equal(actual?.text, "host.example.com: Free disk space on / in %");
});
