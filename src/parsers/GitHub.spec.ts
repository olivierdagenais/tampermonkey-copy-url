import assert from "assert";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { GitHub } from "./GitHub";

test('should parse a simple GitHub repository link', () => {
    const html = `
<html>
    <head>
        <meta charset="utf-8">
        <title>jsdom/jsdom: A JavaScript implementation of various web standards, for use with Node.js</title>
        <meta name="description" content="A JavaScript implementation of various web standards, for use with Node.js - jsdom/jsdom: A JavaScript implementation of various web standards, for use with Node.js">
        <meta name="selected-link" value="repo_source" data-pjax-transient="">
        <meta name="hostname" content="github.com">
        <meta name="expected-hostname" content="github.com">
        <link rel="canonical" href="https://github.com/jsdom/jsdom" data-pjax-transient="">
    </head>
    <body>
        <div aria-live="polite" class="sr-only"></div>
    </body>
</html>`;
    const dom : JSDOM = new JSDOM(html);
    const document : Document = dom.window.document;
    const cut : Parser = new GitHub();

    const actual : Link | null = cut.parseLink(document, "https://github.com/jsdom/jsdom");

    assert.notEqual(actual, null);
    assert.equal(actual?.destination, "https://github.com/jsdom/jsdom");
    assert.equal(actual?.text, "jsdom/jsdom: A JavaScript implementation of various web standards, for use with Node.js");
})
