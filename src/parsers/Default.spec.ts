import assert from "assert";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { Default } from "./Default";

test('should parse a simple HTML page', () => {
    const html = `
    <html><head>
    <title>Example Domain</title>
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>


</body></html>`;
    const dom : JSDOM = new JSDOM(html);
    const document : Document = dom.window.document;
    const cut : Parser = new Default();

    const actual : Link | null = cut.parseLink(document, "https://example.com");

    assert.notEqual(actual, null);
    assert.equal(actual?.destination, "https://example.com");
    assert.equal(actual?.text, "Example Domain");
})

test('should parse a page without a title', () => {
    const html = `
    <html><head>
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>


</body></html>`;
    const dom : JSDOM = new JSDOM(html);
    const document : Document = dom.window.document;
    const cut : Parser = new Default();

    const actual : Link | null = cut.parseLink(document, "https://example.com");

    assert.notEqual(actual, null);
    assert.equal(actual?.destination, "https://example.com");
    assert.equal(actual?.text, "https://example.com");
})
