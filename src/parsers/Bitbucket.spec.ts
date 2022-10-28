import { assert, test } from "vitest";
import { JSDOM } from "jsdom";
import { Link } from "../Link";
import { Parser } from "../Parser";
import { Bitbucket } from "./Bitbucket";

function testParseLink(html: string, url: string): Link | null {
    const dom: JSDOM = new JSDOM(html);
    const document: Document = dom.window.document;
    const cut: Parser = new Bitbucket();

    const actual: Link | null = cut.parseLink(document, url);
    return actual;
}

test("getPrettyRef with a commit ID", () => {
    const input = { ref: "69336ecfefe0dec16963b9d2247b7ce5617939d0" };
    const cut = new Bitbucket();

    const actual = cut.getPrettyRef(input);

    assert.equal(actual, "69336ecfef");
});

test("getPrettyRef with an encoded ref", () => {
    const input = { ref: "refs%2Fheads%2Fmaster" };
    const cut = new Bitbucket();

    const actual = cut.getPrettyRef(input);

    assert.equal(actual, "refs/heads/master");
});

test("getPrettyRef with a simple tag", () => {
    const input = { ref: "v0.0.22" };
    const cut = new Bitbucket();

    const actual = cut.getPrettyRef(input);

    assert.equal(actual, "v0.0.22");
});

test("should parse a simple Bitbucket pull request page", () => {
    const html = `
<html>
    <head>
        <title>Pull Request #4: DO-8731: fix: sanitize GitHub PR comment bodies - Stash</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/pull-requests/4/overview"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/pull-requests/4/overview"
    );
    assert.equal(
        actual?.text,
        "TP/jf_agent#4: DO-8731: fix: sanitize GitHub PR comment bodies"
    );
});

test("should parse a deep link to a line in a file in a PR's commit", () => {
    const html = `
<html>
    <head>
        <title>Pull Request #4: DO-8731: fix: sanitize GitHub PR comment bodies - Stash</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/pull-requests/4/commits/69336ecfefe0dec16963b9d2247b7ce5617939d0#jf_agent/git/github.py?f=379"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/pull-requests/4/commits/69336ecfefe0dec16963b9d2247b7ce5617939d0#jf_agent/git/github.py?f=379"
    );
    assert.equal(
        actual?.text,
        "line 379 of jf_agent/git/github.py at commit 69336ecfef in TP/jf_agent#4: DO-8731: fix: sanitize GitHub PR comment bodies"
    );
});

test("should parse a deep link to a file in a commit", () => {
    const html = `
<html>
    <head>
        <title>ThirdParty / jf_agent / 69336ecfefe - Stash</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/commits/69336ecfefe0dec16963b9d2247b7ce5617939d0#jf_agent/git/github.py"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/commits/69336ecfefe0dec16963b9d2247b7ce5617939d0#jf_agent/git/github.py"
    );
    assert.equal(
        actual?.text,
        "jf_agent/git/github.py at commit 69336ecfef in TP/jf_agent"
    );
});

test("should parse a link to a list of commits for a ref", () => {
    const html = `
<html>
    <head>
        <title>ThirdParty / jf_agent - Stash</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/commits?until=refs%2Fheads%2Fmaster&merges=include"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/commits?until=refs%2Fheads%2Fmaster&merges=include"
    );
    assert.equal(actual?.text, "commits at refs/heads/master in TP/jf_agent");
});

test("should parse a link to lines in a file at a specific commit", () => {
    const html = `
<html>
    <head>
        <title>Source of github.py - jf_agent - Stash</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py?at=69336ecfefe0dec16963b9d2247b7ce5617939d0#377,379-381,383"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py?at=69336ecfefe0dec16963b9d2247b7ce5617939d0#377,379-381,383"
    );
    assert.equal(
        actual?.text,
        "lines 377,379-381,383 of jf_agent/git/github.py at commit 69336ecfef in TP/jf_agent"
    );
});
