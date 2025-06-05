import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { GitHub } from "./GitHub";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new GitHub();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("should parse a simple GitHub repository link", () => {
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

    const actual = testParseLink(html, "https://github.com/jsdom/jsdom");

    assert.notEqual(actual, null);
    assert.equal(actual?.destination, "https://github.com/jsdom/jsdom");
    assert.equal(
        actual?.text,
        "jsdom/jsdom: A JavaScript implementation of various web standards, for use with Node.js"
    );
});

test("should parse a simple GitHub pull request page", () => {
    const html = `
<html>
    <head>
        <title>feat: Improve the clipboard capabilities by olivierdagenais · Pull Request #4 · olivierdagenais/tampermonkey-copy-url</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://github.com/olivierdagenais/tampermonkey-copy-url/pull/4"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://github.com/olivierdagenais/tampermonkey-copy-url/pull/4"
    );
    assert.equal(
        actual?.text,
        "olivierdagenais/tampermonkey-copy-url#4: feat: Improve the clipboard capabilities by olivierdagenais"
    );
});

test("should parse a GitHub pull request page with a deep link", () => {
    const html = `
<html>
    <head>
        <title>feat: Improve the clipboard capabilities by olivierdagenais · Pull Request #4 · olivierdagenais/tampermonkey-copy-url</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://github.com/olivierdagenais/tampermonkey-copy-url/pull/4/commits/98f37a494d7611668adf410163133167b827e721#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5R14"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://github.com/olivierdagenais/tampermonkey-copy-url/pull/4/commits/98f37a494d7611668adf410163133167b827e721#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5R14"
    );
    assert.equal(
        actual?.text,
        "olivierdagenais/tampermonkey-copy-url#4: feat: Improve the clipboard capabilities by olivierdagenais"
    );
});

test("should parse a GitHub discussion page", () => {
    const html = `
<html>
    <head>
        <title>How to execute WSL commands from a windows batch file? · Discussion #6128 · microsoft/WSL</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://github.com/microsoft/WSL/discussions/6128"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://github.com/microsoft/WSL/discussions/6128"
    );
    assert.equal(
        actual?.text,
        "microsoft/WSL#6128: How to execute WSL commands from a windows batch file?"
    );
});

test("should parse a GitHub issue page", () => {
    const html = `
<html>
    <head>
        <title>Nondeterministic output of processors · Issue #219 · jenkinsci/stapler</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://github.com/jenkinsci/stapler/issues/219"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://github.com/jenkinsci/stapler/issues/219"
    );
    assert.equal(
        actual?.text,
        "jenkinsci/stapler#219: Nondeterministic output of processors"
    );
});

test("should parse a GitHub source code link page", () => {
    const html = `
<html>
    <head>
        <title>tampermonkey-copy-url/index.ts at main · olivierdagenais/tampermonkey-copy-url</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://github.com/olivierdagenais/tampermonkey-copy-url/blob/main/src/index.ts"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://github.com/olivierdagenais/tampermonkey-copy-url/blob/main/src/index.ts"
    );
    assert.equal(
        actual?.text,
        "src/index.ts at main in olivierdagenais/tampermonkey-copy-url"
    );
});

test("should parse a GitHub source code link page with refSpec containing a slash", () => {
    const html = `
<html>
    <head>
        <title>tampermonkey-copy-url/index.ts at release/1.1 · olivierdagenais/tampermonkey-copy-url</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://github.com/olivierdagenais/tampermonkey-copy-url/blob/release/1.1/src/index.ts"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://github.com/olivierdagenais/tampermonkey-copy-url/blob/release/1.1/src/index.ts"
    );
    assert.equal(
        actual?.text,
        "src/index.ts at release/1.1 in olivierdagenais/tampermonkey-copy-url"
    );
});

test("should parse a GitHub link to a line", () => {
    const html = `
<html>
    <head>
        <title>workflow-durable-task-step-plugin/src/main/java/org/jenkinsci/plugins/workflow/steps/durable_task/DurableTaskStep.java at 1317.v5337e0c1fe28 · jenkinsci/workflow-durable-task-step-plugin</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://github.com/jenkinsci/workflow-durable-task-step-plugin/blob/1317.v5337e0c1fe28/src/main/java/org/jenkinsci/plugins/workflow/steps/durable_task/DurableTaskStep.java#L498"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://github.com/jenkinsci/workflow-durable-task-step-plugin/blob/1317.v5337e0c1fe28/src/main/java/org/jenkinsci/plugins/workflow/steps/durable_task/DurableTaskStep.java#L498"
    );
    assert.equal(
        actual?.text,
        "line 498 of src/main/java/org/jenkinsci/plugins/workflow/steps/durable_task/DurableTaskStep.java at 1317.v5337e0c1fe28 in jenkinsci/workflow-durable-task-step-plugin"
    );
});
