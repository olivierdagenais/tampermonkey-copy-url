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

test("getPrettyRef with a commit ID as a string", () => {
    const input = "69336ecfefe0dec16963b9d2247b7ce5617939d0";
    const cut = new Bitbucket();

    const actual = cut.getPrettyRef(input);

    assert.equal(actual, "69336ecfef");
});

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

test("should parse a link to a file at a specific commit", () => {
    const html = `
<html>
    <head>
        <title>Source of github.py - jf_agent - Stash</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py?at=69336ecfefe0dec16963b9d2247b7ce5617939d0"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py?at=69336ecfefe0dec16963b9d2247b7ce5617939d0"
    );
    assert.equal(
        actual?.text,
        "jf_agent/git/github.py at commit 69336ecfef in TP/jf_agent"
    );
});

test("should parse a link to a file and make it a specific commit", () => {
    const html = `
<html>
    <head>
        <title>Source of github.py - jf_agent - Stash</title>
    </head>
    <body>
        <section id="content" role="main">
            <div class="aui-page-panel content-body" id="aui-page-panel-content-body">
                <div class="aui-page-panel-inner">
                    <section class="aui-page-panel-content">
                        <div class="aui-toolbar2 branch-selector-toolbar" role="toolbar">
                            <div class="aui-toolbar2-inner">
                                <div class="aui-toolbar2-secondary commit-badge-container">
                                    <div class="commit-badge-oneline">
                                        <div class="double-avatar-with-name avatar-with-name">
                                            <span class="commit-details">
                                                <a
                                                    href="/users/odagenais"
                                                    class="commit-author"
                                                    title="Olivier Dagenais"
                                                >
                                                    Olivier Dagenais
                                                </a>
                                                authored and
                                                <span class="commit-author" title="Matt Klein">
                                                    Matt Klein
                                                </span>
                                                committed
                                                <a
                                                    class="commitid"
                                                    href="/projects/TP/repos/jf_agent/commits/48e30865eb4e894443fd554db2f86eac0807f8a0#jf_agent/git/github.py"
                                                    data-commit-message="fix: sanitize GitHub PR comment bodies"
                                                    data-commitid="48e30865eb4e894443fd554db2f86eac0807f8a0"
                                                >
                                                    48e30865eb4
                                                </a>
                                                <time
                                                    datetime="2022-05-11T16:22:58-0400"
                                                    title="11 May 2022 04:22 PM"
                                                >
                                                    11 May 2022
                                                </time>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </body>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py#377,379-381,383"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py?at=48e30865eb4e894443fd554db2f86eac0807f8a0#377,379-381,383"
    );
    assert.equal(
        actual?.text,
        "lines 377,379-381,383 of jf_agent/git/github.py at commit 48e30865eb in TP/jf_agent"
    );
});

test("fuller/heavier sample, link to a file and make it a specific commit", () => {
    const html = `
<html>
<head>
    <title>
        <title>Source of github.py - jf_agent - Stash</title>
    </title>
</head>
<body class="aui-page-sidebar bitbucket-theme scrolling-forwarded">
    <ul id="assistive-skip-links" class="assistive">
    </ul>
    <div id="page" style="">
        <!-- start #header -->
        <header id="header" role="banner">
            <section class="notifications"></section>
            <nav class="aui-header aui-dropdown2-trigger-group" role="navigation" resolved=""
                data-aui-responsive="true">
                <div class="aui-header-inner">
                </div> <!-- End .aui-header-inner -->
            </nav> <!-- End .aui-header -->
        </header><!-- End #header -->
        <!-- Start #content -->
        <section id="content" role="main" data-reposlug="jf_agent" data-projectkey="TP">
            <section class="notifications"></section>
            <div id="aui-sidebar-content" class="aui-sidebar" tabindex="-1" aria-expanded="true">
            </div>
            <div class="aui-page-panel content-body" id="aui-page-panel-content-body" tabindex="-1">
                <div class="aui-page-panel-inner">
                    <section class="aui-page-panel-content">
                        <div id="default-reviewers-feature-discovery-meta"></div>
                        <header class="aui-page-header page-header-flex">
                            <div class="aui-page-header-inner">
                            </div><!-- .aui-page-header-inner -->
                        </header><!-- .aui-page-header -->
                        <div class="aui-toolbar2 branch-selector-toolbar" role="toolbar">
                            <div class="aui-toolbar2-inner">
                                <div class="aui-toolbar2-primary"></div>
                                <div class="aui-toolbar2-secondary commit-badge-container">
                                    <div class="commit-badge-oneline">
                                        <div class="double-avatar-with-name avatar-with-name">
                                            <span
                                                class="aui-avatar aui-avatar-small user-avatar first-person"
                                                data-username="odagenais">
                                                <span class="aui-avatar-inner">
                                                    <img src="/users/odagenais/avatar.png?s=48&amp;v=1625588370249"
                                                        alt="Olivier Dagenais">
                                                </span>
                                            </span>
                                            <span
                                                class="aui-avatar aui-avatar-small user-avatar second-person"
                                                data-username="Matt Klein">
                                                <span class="aui-avatar-inner">
                                                    <img src="https://secure.gravatar.com/avatar/bfa79aef93f4a085f9646c97c847be58.jpg?s=48&amp;d=mm"
                                                        alt="Matt Klein">
                                                </span>
                                            </span>
                                        </div>
                                        <span class="commit-details">
                                            <a href="/users/odagenais" class="commit-author"
                                                title="Olivier Dagenais">
                                                Olivier Dagenais
                                            </a>
                                            authored and
                                            <span class="commit-author" title="Matt Klein">
                                                Matt Klein
                                            </span>
                                            committed
                                            <a class="commitid"
                                                href="/projects/TP/repos/jf_agent/commits/48e30865eb4e894443fd554db2f86eac0807f8a0#jf_agent/git/github.py"
                                                data-commit-message="fix: sanitize GitHub PR comment bodies"
                                                data-commitid="48e30865eb4e894443fd554db2f86eac0807f8a0"
                                                data-inited="true">
                                                48e30865eb4
                                            </a>
                                            <time datetime="2022-05-11T16:22:58-0400"
                                                title="11 May 2022 04:22 PM">
                                                11 May 2022
                                            </time>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section><!-- .aui-page-panel-content -->
                </div><!-- .aui-page-panel-inner -->
            </div><!-- .aui-page-panel -->
        </section><!-- End #content -->
        <!-- Start #footer -->
        <footer id="footer" role="contentinfo" style="display: none;">
            <section class="notifications"></section>
            <section class="footer-body">
            </section>
        </footer><!-- End #footer -->
    </div>
</body>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py#377,379-381,383"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py?at=48e30865eb4e894443fd554db2f86eac0807f8a0#377,379-381,383"
    );
    assert.equal(
        actual?.text,
        "lines 377,379-381,383 of jf_agent/git/github.py at commit 48e30865eb in TP/jf_agent"
    );
});

test("should parse a link to a line in a file at a specific commit", () => {
    const html = `
<html>
    <head>
        <title>Source of github.py - jf_agent - Stash</title>
    </head>
</html>`;

    const actual = testParseLink(
        html,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py?at=69336ecfefe0dec16963b9d2247b7ce5617939d0#379"
    );

    assert.notEqual(actual, null);
    assert.equal(
        actual?.destination,
        "https://bitbucket.example.com/projects/TP/repos/jf_agent/browse/jf_agent/git/github.py?at=69336ecfefe0dec16963b9d2247b7ce5617939d0#379"
    );
    assert.equal(
        actual?.text,
        "line 379 of jf_agent/git/github.py at commit 69336ecfef in TP/jf_agent"
    );
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
