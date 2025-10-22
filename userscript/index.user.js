// ==UserScript==
// coding: utf-8
// @name tampermonkey-copy-url
// @version 2.17.0
// @namespace https://olivierdagenais.github.io/
// @description A Tampermonkey userscript to copy nice-looking URLs to the clipboard.
// @author Olivier Dagenais
// @homepage https://github.com/olivierdagenais/tampermonkey-copy-url
// @updateURL https://github.com/olivierdagenais/tampermonkey-copy-url/raw/live/userscript/index.user.js
// @downloadURL https://github.com/olivierdagenais/tampermonkey-copy-url/raw/live/userscript/index.user.js
// @match *://*/*
// @require https://cdn.jsdelivr.net/npm/$@types/codemirror@$5.60.15
// @grant GM_setClipboard
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const CopyUrl_1 = __webpack_require__(1);
const Html_1 = __webpack_require__(16);
const JenkinsBuild_1 = __webpack_require__(17);
const JenkinsConfigure_1 = __webpack_require__(18);
const JenkinsConsole_1 = __webpack_require__(20);
const JenkinsCredentials_1 = __webpack_require__(21);
const JenkinsDashboard_1 = __webpack_require__(22);
const JiraLinkIssue_1 = __webpack_require__(23);
const JiraSave_1 = __webpack_require__(24);
const JenkinsNext_1 = __webpack_require__(25);
const JenkinsPipelineSyntax_1 = __webpack_require__(26);
const JenkinsPrevious_1 = __webpack_require__(27);
const JenkinsUp_1 = __webpack_require__(28);
const JiraWorklog_1 = __webpack_require__(29);
const KeyboardShortcut_1 = __webpack_require__(30);
const Markdown_1 = __webpack_require__(31);
const Textile_1 = __webpack_require__(32);
const statusPopup = window.document.createElement("div");
// prettier-ignore
const shortcuts = new Map([
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "b"), [
            new JenkinsBuild_1.JenkinsBuild(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "c"), [
            new JenkinsConfigure_1.JenkinsConfigure(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "f"), [
            new JenkinsConsole_1.JenkinsConsole(),
            new JiraWorklog_1.JiraWorklog(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "k"), [
            new JenkinsCredentials_1.JenkinsCredentials(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "l"), [
            new JiraLinkIssue_1.JiraLinkIssue(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "n"), [
            new JenkinsNext_1.JenkinsNext(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(true, false, false, "o"), [
            new CopyUrl_1.CopyUrl(statusPopup, new Markdown_1.Markdown()),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(true, true, false, "o"), [
            new CopyUrl_1.CopyUrl(statusPopup, new Textile_1.Textile()),
        ]
    ],
    [
        // Ctrl+Alt+o with FR-CA keyboard on Windows 10 yields a "Section Sign"
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "\u00a7"), [
            new CopyUrl_1.CopyUrl(statusPopup, new Textile_1.Textile()),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "p"), [
            new JenkinsPipelineSyntax_1.JenkinsPipelineSyntax(),
            new JenkinsPrevious_1.JenkinsPrevious(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(true, true, false, "p"), [
            new CopyUrl_1.CopyUrl(statusPopup, new Html_1.Html()),
        ]
    ],
    [
        // Ctrl+Alt+p with FR-CA keyboard on Windows 10 yields a "Pilcrow Sign"
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "\u00b6"), [
            new CopyUrl_1.CopyUrl(statusPopup, new Html_1.Html()),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "r"), [
            new JenkinsDashboard_1.JenkinsDashboard(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, true, false, "s"), [
            new JiraSave_1.JiraSave(),
        ]
    ],
    [
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "u"), [
            new JenkinsUp_1.JenkinsUp(),
        ]
    ],
]);
function handleKeydown(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = window.document;
        const url = window.location.href;
        // prettier-ignore
        if (e.ctrlKey ||
            e.altKey ||
            e.target &&
                (!(e.target instanceof HTMLInputElement) &&
                    !(e.target instanceof HTMLTextAreaElement))) {
            const shortcutString = KeyboardShortcut_1.KeyboardShortcut.asString(e.ctrlKey, e.altKey, e.shiftKey, e.key);
            if (shortcuts.has(shortcutString)) {
                const actionList = shortcuts.get(shortcutString);
                if (actionList) {
                    var handled = false;
                    for (const action of actionList) {
                        handled = yield action.perform(document, url, e);
                        if (handled) {
                            break;
                        }
                    }
                    if (handled) {
                        e.preventDefault();
                    }
                }
            }
        }
    });
}
function handleBitbucketSearchLoaded(mutations, observer) {
    return __awaiter(this, void 0, void 0, function* () {
        if (bitbucketSearchDiv) {
            const searchBox = bitbucketSearchDiv.querySelector("form#search-form input.search-query");
            if (searchBox) {
                observer.disconnect();
                searchBox.focus({ preventScroll: false });
            }
        }
        else {
            observer.disconnect();
        }
    });
}
const codeSearchObserver = new MutationObserver(handleBitbucketSearchLoaded);
const codeSearchObserverConfig = {
    subtree: true,
    childList: true,
};
var bitbucketSearchDiv;
const focusedClass = "CodeMirror-focused";
function handleCodeMirrorFocus(mutations, observer) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        for (const mutation of mutations) {
            switch (mutation.type) {
                case "attributes":
                    switch (mutation.attributeName) {
                        case "class":
                            const div = mutation.target;
                            if (div) {
                                if (div.classList.contains(focusedClass) &&
                                    ((_a = mutation.oldValue) === null || _a === void 0 ? void 0 : _a.indexOf(focusedClass)) == -1) {
                                    const editor = div.CodeMirror;
                                    if (editor) {
                                        patchCodeMirrorEditor(editor, div);
                                    }
                                }
                            }
                    }
            }
        }
    });
}
function patchCodeMirrorEditor(editor, div) {
    console.log("Found a CodeMirror, patching Home & End...");
    var extraKeys = editor.getOption("extraKeys");
    if (!extraKeys || typeof extraKeys === "string") {
        extraKeys = {};
        editor.setOption("extraKeys", extraKeys);
    }
    extraKeys.Home = "goLineLeftSmart";
    extraKeys.End = (cm) => cm.extendSelectionsBy((range) => {
        const top = cm.cursorCoords(range.head, "div").top + 5;
        const coords = cm.coordsChar({
            left: div.offsetWidth,
            top: top,
        }, "div");
        const doc = cm.getDoc();
        const currentLine = doc.getLine(coords.line);
        if (coords.ch != 0 && coords.ch != currentLine.length) {
            coords.ch = coords.ch - 1;
        }
        return coords;
    });
}
const codeMirrorObserver = new MutationObserver(handleCodeMirrorFocus);
const codeMirrorObserverConfig = {
    attributeFilter: ["class"],
    attributeOldValue: true,
    subtree: true,
};
var bitbucketBody;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var doc = window.document;
        const styleAttribute = doc.createAttribute("style");
        styleAttribute.value = `
        position: fixed;
        top:0;
        right: 0;
        z-index: 65535;
        color: black;
        background-color: white;
        padding: 5px;
        display: none;
    `;
        statusPopup.attributes.setNamedItem(styleAttribute);
        doc.body.appendChild(statusPopup);
        const jiraBody = doc.querySelector("body#jira[data-version]");
        bitbucketBody = doc.querySelector("body.bitbucket-theme");
        if (jiraBody) {
            const anchor = jiraBody.querySelector("a#home_link[accesskey=d]");
            if (anchor) {
                anchor.removeAttribute("accesskey");
            }
        }
        else if (bitbucketBody) {
            bitbucketSearchDiv = bitbucketBody.querySelector("div#codesearch");
            if (bitbucketSearchDiv) {
                codeSearchObserver.observe(bitbucketSearchDiv, codeSearchObserverConfig);
            }
            else {
                codeMirrorObserver.observe(bitbucketBody, codeMirrorObserverConfig);
            }
        }
        window.addEventListener("keydown", handleKeydown);
    });
}
main();


/***/ }),
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CopyUrl = void 0;
const Bitbucket_1 = __webpack_require__(2);
const Confluence_1 = __webpack_require__(4);
const Default_1 = __webpack_require__(5);
const GitHub_1 = __webpack_require__(6);
const GitLab_1 = __webpack_require__(7);
const Jenkins_1 = __webpack_require__(9);
const Jira_1 = __webpack_require__(12);
const ServiceDesk_1 = __webpack_require__(13);
const ServiceNow_1 = __webpack_require__(14);
const Zabbix_1 = __webpack_require__(15);
// parsers will be attempted in the order defined here
const parsers = [
    new Confluence_1.Confluence(),
    new GitHub_1.GitHub(),
    new GitLab_1.GitLab(),
    new Bitbucket_1.Bitbucket(),
    new Jira_1.Jira(),
    new Jenkins_1.Jenkins(),
    new ServiceDesk_1.ServiceDesk(),
    new ServiceNow_1.ServiceNow(),
    new Zabbix_1.Zabbix(),
    // always keep this one LAST in this list!
    new Default_1.Default(),
];
class CopyUrl {
    constructor(statusPopup, selectedRenderer) {
        this.statusPopup = statusPopup;
        this.selectedRenderer = selectedRenderer;
    }
    perform(doc, url, e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            console.log("asking the parsers...");
            var link = {
                text: url,
                destination: url,
            };
            var selectedParser = parsers[parsers.length - 1];
            for (let i = 0; i < parsers.length; i++) {
                const parser = parsers[i];
                selectedParser = parser;
                var candidate = parser.parseLink(doc, url);
                if (candidate) {
                    link = candidate;
                    break;
                }
            }
            const clipboard = this.selectedRenderer.render(link);
            const status = `Parsed using ${selectedParser.constructor["name"]}:` +
                `<br />Destination: ${link.destination}` +
                `<br />Text: ${link.text}` +
                `<br />Rendered with ${this.selectedRenderer.constructor["name"]}.`;
            var result = null;
            result = yield this.copyWithAsyncClipboardApi(clipboard);
            if (result != null) {
                result = yield this.copyWithGreaseMonkeyClipboardApi(clipboard);
            }
            if (result == null) {
                const successHtml = `${status}<br />Success!`;
                this.showStatusPopup(successHtml);
            }
            else {
                const failureHtml = `${status}<br />` +
                    `<span style="color:darkred">Failure: ${result}</span>`;
                this.showStatusPopup(failureHtml);
            }
            return true;
        });
    }
    copyWithGreaseMonkeyClipboardApi(clipboard) {
        return __awaiter(this, void 0, void 0, function* () {
            if (clipboard.html !== null) {
                GM_setClipboard(clipboard.html, "html");
            }
            else {
                GM_setClipboard(clipboard.text, "text");
            }
            return null;
        });
    }
    /**
     * Attempts to copy the specified data to the clipboard using the
     * standardized (async) Clipboard API as per
     * https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
     *
     * Restrictions: only works when the page is served over a secure channel
     * (or via localhost) as per https://stackoverflow.com/a/65996386/98903
     *
     * @param clipboard an instance of Clipboard with the data to copy
     */
    copyWithAsyncClipboardApi(clipboard) {
        return __awaiter(this, void 0, void 0, function* () {
            var clipboardItemVersions = {};
            clipboardItemVersions["text/plain"] = new Blob([clipboard.text], {
                type: "text/plain",
            });
            if (clipboard.html !== null) {
                clipboardItemVersions["text/html"] = new Blob([clipboard.html], {
                    type: "text/html",
                });
            }
            try {
                const clipboardItem = new ClipboardItem(clipboardItemVersions);
                const data = [clipboardItem];
                yield navigator.clipboard.write(data);
                return null;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    showStatusPopup(innerHTML) {
        // TODO: fade in?
        this.statusPopup.innerHTML = innerHTML;
        this.statusPopup.style.display = "block";
        window.setTimeout(() => this.statusPopup.style.display = "none", 5000 /*ms*/);
        console.log(innerHTML);
    }
}
exports.CopyUrl = CopyUrl;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Bitbucket = void 0;
const AbstractParser_1 = __webpack_require__(3);
const bbUrlRegex = /https?:\/\/(?<host>[^/]+)\/([^/]+\/)*(?<projectsOrUsers>projects|users)\/(?<project>[^/]+)\/repos\/(?<repo>[^/]+)\/(?<rest>.+)/;
const browseUrlRegex = /browse(\/(?<path>[^?#]+)?(\?at=(?<ref>[^#]+))?(#(?<lines>[0-9,-]+))?)?/;
const commitIdRegex = /([a-f0-9]{40})/;
const commitListUrlRegex = /commits\?until=(?<ref>[^&]+)(&.+)?/;
const deepCommitUrlRegex = /commits\/(?<ref>[^#]+)(#(?<path>[^?]+)(\?[ft]=(?<lineNumber>\d+))?)?/;
const prUrlRegex = /pull-requests\/(?<prId>\d+)(\/(?<extra>.*))?/;
class Bitbucket extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        const bbUrlMatch = url.match(bbUrlRegex);
        if (!bbUrlMatch || !bbUrlMatch.groups) {
            return null;
        }
        const bbUrlGroups = bbUrlMatch.groups;
        const projectsOrUsers = bbUrlGroups.projectsOrUsers;
        const project = (projectsOrUsers === "users" ? "~" : "") + bbUrlGroups.project;
        const repo = bbUrlGroups.repo;
        const rest = bbUrlGroups.rest;
        const browseUrlMatch = rest.match(browseUrlRegex);
        if (browseUrlMatch && browseUrlMatch.groups) {
            const browseUrlGroups = browseUrlMatch.groups;
            return this.parseBrowseUrl(doc, url, project, repo, browseUrlGroups);
        }
        const prUrlMatch = rest.match(prUrlRegex);
        if (prUrlMatch && prUrlMatch.groups) {
            const prUrlGroups = prUrlMatch.groups;
            return this.parsePullRequest(doc, url, project, repo, prUrlGroups);
        }
        const commitListUrlMatch = rest.match(commitListUrlRegex);
        if (commitListUrlMatch && commitListUrlMatch.groups) {
            const commitListUrlGroups = commitListUrlMatch.groups;
            return this.parseCommitList(url, project, repo, commitListUrlGroups);
        }
        const deepCommitUrlMatch = rest.match(deepCommitUrlRegex);
        if (deepCommitUrlMatch && deepCommitUrlMatch.groups) {
            const deepCommitUrlGroups = deepCommitUrlMatch.groups;
            return this.parseDeepCommit(url, project, repo, deepCommitUrlGroups);
        }
        return null;
    }
    getPrettyRef(stringOrMatchGroups) {
        const ref = typeof stringOrMatchGroups === "string"
            ? stringOrMatchGroups
            : stringOrMatchGroups.ref;
        if (ref.indexOf("%") > -1) {
            return decodeURIComponent(ref);
        }
        const commitIdMatch = ref.match(commitIdRegex);
        if (commitIdMatch) {
            return ref.substring(0, 10);
        }
        return ref;
    }
    countLines(input) {
        var result = "line";
        if (input.indexOf("-") > -1 || input.indexOf(",") > -1) {
            result += "s";
        }
        return result;
    }
    parseBrowseUrl(doc, url, project, repo, browseUrlGroups) {
        var prefix = "";
        if (browseUrlGroups.lines) {
            const lines = browseUrlGroups.lines;
            const countLines = this.countLines(lines);
            prefix += `${countLines} ${lines} of `;
        }
        if (browseUrlGroups.path) {
            prefix += `${browseUrlGroups.path} at `;
        }
        if (browseUrlGroups.ref) {
            const ref = this.getPrettyRef(browseUrlGroups);
            prefix += `commit ${ref} in `;
        }
        else {
            const anchorElement = doc.querySelector("html > body section#content a[data-commitid]");
            if (anchorElement) {
                const rawRef = anchorElement.getAttribute("data-commitid");
                if (rawRef) {
                    const ref = this.getPrettyRef(rawRef);
                    prefix += `commit ${ref} in `;
                    // now we need to insert at=${rawUrl} in the original URL's query string
                    const parsedUrl = new URL(url);
                    parsedUrl.searchParams.set("at", rawRef);
                    url = parsedUrl.toString();
                }
            }
        }
        const linkText = `${prefix}${project}/${repo}`;
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
    parseCommitList(url, project, repo, commitListUrlGroups) {
        const ref = this.getPrettyRef(commitListUrlGroups);
        const linkText = `commits at ${ref} in ${project}/${repo}`;
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
    parseDeepCommit(url, project, repo, deepCommitUrlGroups) {
        const prefix = this.prefixForLinePathCommit(deepCommitUrlGroups);
        const linkText = `${prefix}${project}/${repo}`;
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
    prefixForLinePathCommit(groups) {
        var prefix = "";
        const path = groups.path;
        if (path) {
            const lineNumber = groups.lineNumber;
            if (lineNumber) {
                prefix += `line ${lineNumber} of `;
            }
            const decodedPath = decodeURIComponent(path);
            prefix += `${decodedPath} at `;
        }
        const ref = this.getPrettyRef(groups);
        prefix += `commit ${ref} in `;
        return prefix;
    }
    parsePullRequest(doc, url, project, repo, prUrlGroups) {
        const prId = prUrlGroups.prId;
        const extra = prUrlGroups.extra;
        const h2Selectors = [
            "html > body h2.pull-request-title",
            "html > body span.pull-request-title > h2",
        ];
        const h2Element = doc.querySelector(h2Selectors.join(", "));
        if (!h2Element) {
            return null;
        }
        const summary = h2Element.textContent;
        var prefix = "";
        if (extra) {
            const prExtraMatch = extra.match(deepCommitUrlRegex);
            if (prExtraMatch && prExtraMatch.groups) {
                const prExtraGroups = prExtraMatch.groups;
                prefix = this.prefixForLinePathCommit(prExtraGroups);
            }
        }
        const linkText = `${prefix}${project}/${repo}#${prId}: ${summary}`;
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
exports.Bitbucket = Bitbucket;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractParser = void 0;
class AbstractParser {
    findTitle(doc) {
        const titleElement = doc.querySelector("html head title");
        if (!titleElement) {
            return null;
        }
        return titleElement.textContent;
    }
}
exports.AbstractParser = AbstractParser;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Confluence = void 0;
const AbstractParser_1 = __webpack_require__(3);
class Confluence extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        const bodyElement = doc.querySelector("#com-atlassian-confluence");
        if (!bodyElement) {
            return null;
        }
        const shortlinkElement = doc.querySelector("html > head > link[rel=shortlink]");
        if (shortlinkElement) {
            url = shortlinkElement.href;
        }
        const titleElement = doc.querySelector("#title-text");
        if (!titleElement || !titleElement.textContent) {
            return null;
        }
        var linkText = titleElement.textContent.trim();
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
exports.Confluence = Confluence;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Default = void 0;
class Default {
    parseLink(doc, url) {
        var _a;
        const titleElement = doc.querySelector("html head title");
        const result = {
            text: (_a = titleElement === null || titleElement === void 0 ? void 0 : titleElement.textContent) !== null && _a !== void 0 ? _a : url,
            destination: url,
        };
        return result;
    }
}
exports.Default = Default;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitHub = void 0;
const AbstractParser_1 = __webpack_require__(3);
class GitHub extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        if (url.startsWith("https://github.com/")) {
            const titleContent = this.findTitle(doc);
            var titleString = titleContent !== null && titleContent !== void 0 ? titleContent : url;
            // TODO: implement special handling for PRs, issues, source code
            const blobUrlRegex = /https:\/\/github.com\/(?<userOrOrg>[^/]+)\/(?<repo>[^/]+)\/blob\/(?<refSpecAndPath>.+)/;
            const blobUrlMatch = url.match(blobUrlRegex);
            if (blobUrlMatch && blobUrlMatch.groups) {
                const blobUrlGroups = blobUrlMatch.groups;
                const refSpecAndPath = blobUrlGroups.refSpecAndPath;
                const blobTitleRegex = /[^/]+\/(?<fileName>.+) at (?<refSpec>.+) · (?<userOrOrg>[^/]+)\/(?<repo>.+)/;
                const blobTitleMatch = titleString.match(blobTitleRegex);
                if (blobTitleMatch && blobTitleMatch.groups) {
                    const blobTitleGroups = blobTitleMatch.groups;
                    const refSpec = blobTitleGroups.refSpec;
                    const pathAndMaybeLine = refSpecAndPath.substring(refSpec.length + 1 /* the slash */);
                    const indexOfHash = pathAndMaybeLine.indexOf("#L");
                    let path = "";
                    let prefix = "";
                    if (indexOfHash > -1) {
                        path = pathAndMaybeLine.substring(0, indexOfHash);
                        prefix = "line " + pathAndMaybeLine.substring(indexOfHash + 2) + " of ";
                    }
                    else {
                        path = pathAndMaybeLine;
                    }
                    titleString = `${prefix}${path} at ${refSpec} in ${blobUrlGroups.userOrOrg}/${blobUrlGroups.repo}`;
                }
            }
            else {
                const numberedUrlRegex = /https:\/\/github.com\/(?<userOrOrg>[^/]+)\/(?<repo>[^/]+)\/(?:.+)\/(?<id>\d+)/;
                const numberedUrlMatch = url.match(numberedUrlRegex);
                if (numberedUrlMatch) {
                    const numberedTitleRegex = /(?<title>.+) · (?:.+) #(?<id>\d+) · (?<userOrOrg>[^/]+)\/(?<repo>.+)/;
                    const numberedTitleMatch = titleString.match(numberedTitleRegex);
                    if (numberedTitleMatch && numberedTitleMatch.groups) {
                        const groups = numberedTitleMatch.groups;
                        titleString = `${groups.userOrOrg}/${groups.repo}#${groups.id}: ${groups.title}`;
                    }
                }
            }
            const result = {
                text: titleString,
                destination: url,
            };
            return result;
        }
        return null;
    }
}
exports.GitHub = GitHub;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitLab = void 0;
const AbstractParser_1 = __webpack_require__(3);
const GitLabData_1 = __webpack_require__(8);
class GitLab extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        const siteNameSelector = "html head meta[property='og:site_name'][content='GitLab']";
        const siteName = doc.querySelector(siteNameSelector);
        if (!siteName) {
            return null;
        }
        const data = new GitLabData_1.GitLabData(doc);
        let linkText;
        switch (data.page) {
            case "projects:show":
                linkText = `${data.projectFullPath}: ${data.description}`;
                break;
            case "projects:issues:show":
            case "projects:work_items:show":
            case "projects:merge_requests:show":
                linkText
                    = `${data.projectFullPath}${data.typeId}: ${data.title}`;
                break;
            case "projects:wikis:show":
                linkText = `${data.projectFullPath}: ${data.title}`;
                break;
            default:
                linkText = data.page;
                break;
        }
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
exports.GitLab = GitLab;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitLabData = void 0;
class GitLabData {
    constructor(doc) {
        var _a, _b, _c, _d, _e;
        const descriptionSelector = "html head meta[property='og:description']";
        const descriptionElement = doc.querySelector(descriptionSelector);
        const description = descriptionElement === null || descriptionElement === void 0 ? void 0 : descriptionElement.getAttribute("content");
        const bodySelector = "html body";
        const bodyElement = doc.querySelector(bodySelector);
        this.description
            = description !== null && description !== void 0 ? description : "(no description)";
        this.page
            = (_a = bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.getAttribute("data-page")) !== null && _a !== void 0 ? _a : "(no page)";
        this.projectFullPath
            = (_b = bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.getAttribute("data-project-full-path")) !== null && _b !== void 0 ? _b : "(no path)";
        const titleSelectors = [
            "[data-testid='work-item-title']",
            "[data-testid='title-content']",
            "[data-testid='page-heading']",
        ];
        const titleSelector = titleSelectors.join(", ");
        const element = doc.querySelector(titleSelector);
        this.title
            = (_d = (_c = element === null || element === void 0 ? void 0 : element.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "(no title)";
        const rawTypeId = bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.getAttribute("data-page-type-id");
        const anchorElement = doc.querySelector(".router-link-exact-active");
        const fallbackTypeId = (_e = anchorElement === null || anchorElement === void 0 ? void 0 : anchorElement.textContent) === null || _e === void 0 ? void 0 : _e.trim();
        let typeId = "(no type ID)";
        switch (this.page) {
            case "projects:issues:show":
                typeId = `#${rawTypeId}`;
                break;
            case "projects:merge_requests:show":
                typeId = `!${rawTypeId}`;
                break;
            case "projects:work_items:show":
                typeId = `${fallbackTypeId}`;
                break;
        }
        this.typeId = typeId;
    }
}
exports.GitLabData = GitLabData;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Jenkins = void 0;
const AbstractParser_1 = __webpack_require__(3);
const JenkinsHelpers_1 = __webpack_require__(10);
// Right-Pointing Double Angle Quotation Mark
const chevron = "\u00BB";
class Jenkins extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        const selector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const urlParts = JenkinsHelpers_1.JenkinsHelpers.splitUrlPath(url);
        const isUrlToRunConsole = "console" === urlParts[urlParts.length - 1] &&
            JenkinsHelpers_1.JenkinsHelpers.isInteger(urlParts[urlParts.length - 2]);
        var linkText = ``;
        const listItems = doc.querySelectorAll(selector);
        listItems.forEach((value, key) => {
            if (key > 0) {
                const anchor = value.querySelector("a");
                if (anchor) {
                    var isUrlToRun = false;
                    const href = anchor.getAttribute("href");
                    if (href) {
                        const hrefParts = JenkinsHelpers_1.JenkinsHelpers.splitPath(href);
                        const lastPart = hrefParts[hrefParts.length - 1];
                        if (JenkinsHelpers_1.JenkinsHelpers.isInteger(lastPart)) {
                            isUrlToRun = !("node" === hrefParts[hrefParts.length - 2] &&
                                "execution" === hrefParts[hrefParts.length - 3]);
                        }
                    }
                    if (key > 1) {
                        if (isUrlToRun) {
                            linkText += ` `;
                        }
                        else {
                            linkText += ` ${chevron} `;
                        }
                    }
                    linkText += anchor.text.trim();
                    if (key == listItems.length - 1 && isUrlToRunConsole) {
                        linkText += ` ${chevron} Console Output`;
                    }
                }
            }
        });
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
exports.Jenkins = Jenkins;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsHelpers = void 0;
const SemVer_1 = __webpack_require__(11);
const jenkins2_463 = SemVer_1.SemVer.parse("2.463");
class JenkinsHelpers {
    static buildUrl(urlString, newPath, queryString) {
        const url = new URL(urlString);
        url.pathname = newPath;
        if (queryString) {
            url.search = queryString;
        }
        return url.toString();
    }
    static getBodyElement(doc) {
        const bodyElement = doc.querySelector("html body[id=jenkins]");
        return bodyElement;
    }
    static getBreadcrumbItemSelector(bodyElement) {
        var selector = ".jenkins-breadcrumbs__list-item";
        const jenkinsVersion = bodyElement.getAttribute("data-version");
        switch (jenkinsVersion) {
            case "2.361.4":
                selector = ".jenkins-breadcrumbs .item";
                break;
        }
        return selector;
    }
    static getMostRecentRunSelector(bodyElement) {
        const jenkinsVersion = bodyElement.getAttribute("data-version");
        if (!jenkinsVersion) {
            throw new Error("I can't determine the Jenkins version!");
        }
        const jenkinsSemVer = SemVer_1.SemVer.parse(jenkinsVersion);
        // jenkinsci/jenkins#9148: Rewrite the build history widget by janfaracik
        // https://github.com/jenkinsci/jenkins/pull/9148
        if (jenkins2_463.compareTo(jenkinsSemVer) <= 0) {
            return "#jenkins-build-history a.app-builds-container__item__inner__link";
        }
        return "tr.build-row a.build-link";
    }
    static isInteger(s) {
        return Number.isInteger(Number.parseInt(s, 10));
    }
    static splitPath(path) {
        const numToTrim = path.endsWith("/") ? 1 : 0;
        const adjustedPath = path.substring(0, path.length - numToTrim);
        const pathParts = adjustedPath.split("/");
        return pathParts;
    }
    static splitUrlPath(urlString) {
        const url = new URL(urlString);
        return this.splitPath(url.pathname);
    }
}
exports.JenkinsHelpers = JenkinsHelpers;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SemVer = void 0;
const semVerRegex = /(?<major>\d+)\.(?<minor>\d+)(?:\.(?<patch>\d+)(?:-(?<preRelease>.+))?)?/;
class SemVer {
    constructor(major, minor, patch, preRelease) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.preRelease = preRelease;
    }
    static asInteger(value) {
        const maybeInt = Number.parseInt(value, 10);
        if (Number.isNaN(maybeInt)) {
            return 0;
        }
        return maybeInt;
    }
    static compareTo(x, y) {
        if (x == y) {
            return 0;
        }
        if (x < y) {
            return -1;
        }
        return 1;
    }
    compareTo(that) {
        // TODO: this doesn't (yet) compare pre-releases
        return (SemVer.compareTo(this.major, that.major) ||
            SemVer.compareTo(this.minor, that.minor) ||
            SemVer.compareTo(this.patch, that.patch));
    }
    static parse(value) {
        const valueMatch = value.match(semVerRegex);
        if (!valueMatch || !valueMatch.groups) {
            throw new Error(`Can't parse ${value} as a valid SemVer`);
        }
        const valueGroups = valueMatch.groups;
        const major = SemVer.asInteger(valueGroups.major);
        const minor = SemVer.asInteger(valueGroups.minor);
        const patch = SemVer.asInteger(valueGroups.patch);
        const preRelease = valueGroups.preRelease;
        return new SemVer(major, minor, patch, preRelease);
    }
}
exports.SemVer = SemVer;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Jira = void 0;
const AbstractParser_1 = __webpack_require__(3);
const issuePathRegex = /browse\/(?<issueKey>[A-Z][A-Z0-9]+-\d+)/;
class Jira extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        const u = new URL(url);
        const path = u.pathname;
        if (path.indexOf("browse/") == -1) {
            return null;
        }
        const pathMatch = path.match(issuePathRegex);
        if (!pathMatch || !pathMatch.groups) {
            return null;
        }
        const pathGroups = pathMatch.groups;
        const issueKey = pathGroups.issueKey;
        var linkText = `${issueKey}`;
        const h1Element = doc.querySelector("#summary-val");
        if (h1Element) {
            const summary = h1Element.textContent;
            if (summary) {
                linkText += `: ${summary}`;
            }
        }
        const cleanUrl = new URL(url);
        cleanUrl.search = "";
        cleanUrl.hash = "";
        const result = {
            text: linkText,
            destination: cleanUrl.toString(),
        };
        return result;
    }
}
exports.Jira = Jira;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDesk = void 0;
const AbstractParser_1 = __webpack_require__(3);
const urlRegex = /https:\/\/(?<host>[^/]+)\/WorkOrder.do\?(?<rest>.+)/;
class ServiceDesk extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        var _a, _b;
        const urlMatch = url.match(urlRegex);
        if (!urlMatch || !urlMatch.groups) {
            return null;
        }
        var linkText = `ServiceDesk`;
        const spanIdElement = doc.querySelector("#request-id");
        if (spanIdElement) {
            const requestId = (_a = spanIdElement.textContent) === null || _a === void 0 ? void 0 : _a.trim();
            if (requestId) {
                linkText += ` ${requestId}`;
            }
        }
        const spanSubjectElement = doc.querySelector("#req_subject");
        if (spanSubjectElement) {
            const requestSubject = (_b = spanSubjectElement.textContent) === null || _b === void 0 ? void 0 : _b.trim();
            if (requestSubject) {
                linkText += `: ${requestSubject}`;
            }
        }
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
exports.ServiceDesk = ServiceDesk;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceNow = void 0;
const AbstractParser_1 = __webpack_require__(3);
class ServiceNow extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        var _a, _b, _c;
        const ticketNumberSelectors = [
            "#data\\.number\\.name",
            "h2.ticket-number",
        ];
        const ticketNumberElement = doc.querySelector(ticketNumberSelectors.join(", "));
        if (ticketNumberElement) {
            var linkText = ``;
            const ticketNumber = ticketNumberElement.textContent;
            if (ticketNumber) {
                linkText += ticketNumber.trim();
                var subject;
                const variablesToggle = doc.querySelector("#variables-toggle");
                if (variablesToggle) {
                    const bolds = variablesToggle.querySelectorAll("div > label > b");
                    for (let i = 0; i < bolds.length; i++) {
                        const bold = bolds.item(i);
                        const boldText = (_a = bold.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                        if ("Subject" == boldText) {
                            const parentDiv = (_b = bold.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                            const span = parentDiv === null || parentDiv === void 0 ? void 0 : parentDiv.querySelector("div > div> span");
                            subject = (_c = span === null || span === void 0 ? void 0 : span.textContent) === null || _c === void 0 ? void 0 : _c.trim();
                            break;
                        }
                    }
                }
                // only consider these as a last resort, because sometimes they contain
                // useless text and the real subject/summary was in the "variables-toggle" element
                if (!subject) {
                    const subjectSelectors = [
                        "#short-desc",
                        "p.ticket-desc",
                    ];
                    const subjectElement = doc.querySelector(subjectSelectors.join(", "));
                    if (subjectElement) {
                        subject = subjectElement.textContent;
                    }
                }
                if (subject) {
                    linkText += `: ${subject.trim()}`;
                }
                const result = {
                    text: linkText,
                    destination: url,
                };
                return result;
            }
        }
        return null;
    }
}
exports.ServiceNow = ServiceNow;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Zabbix = void 0;
const AbstractParser_1 = __webpack_require__(3);
class Zabbix extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        const footerElement = doc.querySelector("html > body footer[role]");
        if (!footerElement) {
            return null;
        }
        const titleElement = doc.querySelector("h1#page-title-general");
        if (!titleElement || !titleElement.textContent) {
            return null;
        }
        var linkText = titleElement.textContent.trim();
        const formElement = doc.querySelector("html > body form[name=zbx_filter]");
        if (formElement) {
            // now we need to insert from & to values in the original URL's query string
            const parsedUrl = new URL(url);
            const fromInputElement = doc.querySelector("input#from");
            if (fromInputElement) {
                const from = fromInputElement.value;
                if (from) {
                    parsedUrl.searchParams.set("from", from);
                }
            }
            const toInputElement = doc.querySelector("input#to");
            if (toInputElement) {
                const to = toInputElement.value;
                if (to) {
                    parsedUrl.searchParams.set("to", to);
                }
            }
            url = parsedUrl.toString();
        }
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
exports.Zabbix = Zabbix;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Html = void 0;
class Html {
    render(link) {
        let result = {
            text: link.text,
            html: `<a href="${link.destination}">${link.text}</a>`,
        };
        return result;
    }
}
exports.Html = Html;


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsBuild = void 0;
const JenkinsHelpers_1 = __webpack_require__(10);
class JenkinsBuild {
    perform(doc, url, e) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.navigate(doc, url);
            if (request) {
                setTimeout(() => this.queueRun(request), 1 /*ms*/);
                return true;
            }
            return false;
        });
    }
    static fetchBuildableItem(location) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Request(location);
            const response = yield fetch(request);
            const result = this.createBuildableItem(response);
            return result;
        });
    }
    static createBuildableItem(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield response.json();
            const result = {
                blocked: map.blocked || false,
                buildable: map.buildable || false,
                stuck: map.stuck || false,
                cancelled: map.cancelled || false,
                executable: map.executable || null,
            };
            return result;
        });
    }
    navigate(doc, url) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        const headers = new Headers();
        const headElement = doc.querySelector("head[data-crumb-header][data-crumb-value]");
        if (!headElement) {
            return null;
        }
        const headerName = headElement.getAttribute("data-crumb-header");
        const headerValue = headElement.getAttribute("data-crumb-value");
        if (!headerName || !headerValue) {
            return null;
        }
        headers.append(headerName, headerValue);
        const PostOptions = {
            method: "POST",
            credentials: "same-origin",
            headers: headers,
            mode: "same-origin",
            cache: "default",
        };
        /* <a> elements with an href ending in "/build?delay=0sec" */
        const linkSelector = "a[href$='/build?delay=0sec']";
        const crumbSelector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const crumbListItems = doc.querySelectorAll(crumbSelector);
        if (bodyElement.querySelector(linkSelector)) {
            const index = crumbListItems.length - 1;
            const listItem = crumbListItems.item(index);
            const anchor = listItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    const destinationUrl = JenkinsHelpers_1.JenkinsHelpers.buildUrl(url, path + "build", "delay=0sec");
                    return new Request(destinationUrl, PostOptions);
                }
            }
        }
        else {
            for (var index = crumbListItems.length - 1; index > 1; index--) {
                const item = crumbListItems.item(index);
                const anchor = item.querySelector("a");
                if (anchor) {
                    const href = anchor.getAttribute("href");
                    if (href) {
                        const hrefParts = JenkinsHelpers_1.JenkinsHelpers.splitPath(href);
                        if ("job" == hrefParts[hrefParts.length - 2]) {
                            const destinationUrl = JenkinsHelpers_1.JenkinsHelpers.buildUrl(url, href + "build", "delay=0sec");
                            return new Request(destinationUrl, PostOptions);
                        }
                    }
                }
            }
        }
        return null;
    }
    queueRun(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(request);
            const locationBase = response.headers.get("Location");
            if (201 == response.status && locationBase) {
                // TODO: announce to user
                // locationBase looks like "http://localhost:8080/queue/item/18/"
                const location = locationBase + "api/json";
                for (let index = 0; index < 10; index++) {
                    // TODO: should we wait _first_?
                    const buildableItem = yield JenkinsBuild.fetchBuildableItem(location);
                    if (buildableItem.cancelled) {
                        // TODO: announce to user
                        break;
                    }
                    if (buildableItem.executable) {
                        const runUrl = buildableItem.executable.url;
                        if (runUrl) {
                            const consoleUrl = runUrl + "consoleFull";
                            window.location.href = consoleUrl;
                            break;
                        }
                    }
                    // TODO: announce to user
                    // TODO: we could also do a capped exponential backoff: 1, 2, 4, 4, 4, 4
                    yield JenkinsBuild.sleep(1000);
                }
            }
            else if (400 == response.status) {
                // build is parameterized, try again with HTTP GET
                window.location.href = request.url;
            }
        });
    }
    // https://stackoverflow.com/a/47092642/98903
    static sleep(milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(resolve, milliseconds);
            });
        });
    }
}
exports.JenkinsBuild = JenkinsBuild;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsConfigure = void 0;
const GoToAction_1 = __webpack_require__(19);
const JenkinsHelpers_1 = __webpack_require__(10);
class JenkinsConfigure extends GoToAction_1.GoToAction {
    navigate(doc, urlString) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        const selector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems) {
            const urlParts = JenkinsHelpers_1.JenkinsHelpers.splitUrlPath(urlString);
            const isUrlToRun = "job" === urlParts[urlParts.length - 3] &&
                JenkinsHelpers_1.JenkinsHelpers.isInteger(urlParts[urlParts.length - 1]);
            if (isUrlToRun) {
                const penultimateItem = breaCrumbListItems.item(breaCrumbListItems.length - 2);
                const anchor = penultimateItem.querySelector("a");
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return (JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path) +
                            "configure");
                    }
                }
                return null;
            }
            const lastItem = breaCrumbListItems.item(breaCrumbListItems.length - 1);
            const anchor = lastItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return (JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path) + "configure");
                }
            }
        }
        return null;
    }
}
exports.JenkinsConfigure = JenkinsConfigure;


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoToAction = void 0;
class GoToAction {
    perform(doc, url, e) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.navigate(doc, url);
            if (result) {
                window.location.href = result;
                return true;
            }
            return false;
        });
    }
}
exports.GoToAction = GoToAction;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsConsole = void 0;
const GoToAction_1 = __webpack_require__(19);
const JenkinsHelpers_1 = __webpack_require__(10);
class JenkinsConsole extends GoToAction_1.GoToAction {
    navigate(doc, urlString) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        const selector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems) {
            const urlParts = JenkinsHelpers_1.JenkinsHelpers.splitUrlPath(urlString);
            const isUrlToRun = "job" === urlParts[urlParts.length - 3] &&
                JenkinsHelpers_1.JenkinsHelpers.isInteger(urlParts[urlParts.length - 1]);
            if (isUrlToRun) {
                const lastItem = breaCrumbListItems.item(breaCrumbListItems.length - 1);
                const anchor = lastItem.querySelector("a");
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path + "consoleFull");
                    }
                }
                return null;
            }
            else {
                const mostRecentRunSelector = JenkinsHelpers_1.JenkinsHelpers.getMostRecentRunSelector(bodyElement);
                const anchor = bodyElement.querySelector(mostRecentRunSelector);
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path + "consoleFull");
                    }
                }
            }
        }
        return null;
    }
}
exports.JenkinsConsole = JenkinsConsole;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsCredentials = void 0;
const JenkinsHelpers_1 = __webpack_require__(10);
const GoToAction_1 = __webpack_require__(19);
class JenkinsCredentials extends GoToAction_1.GoToAction {
    navigate(doc, url) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        /* <a> elements with an href ending in "credentials" */
        const selector = "a[href$='/credentials']";
        const crumbSelector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const crumbListItems = doc.querySelectorAll(crumbSelector);
        var index = -1;
        if (1 == crumbListItems.length) {
            index = 0;
        }
        else if (bodyElement.querySelector(selector)) {
            index = crumbListItems.length - 1;
        }
        if (index >= 0) {
            const listItem = crumbListItems.item(index);
            const anchor = listItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return JenkinsHelpers_1.JenkinsHelpers.buildUrl(url, path + "credentials");
                }
            }
        }
        return null;
    }
}
exports.JenkinsCredentials = JenkinsCredentials;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsDashboard = void 0;
const GoToAction_1 = __webpack_require__(19);
const JenkinsHelpers_1 = __webpack_require__(10);
class JenkinsDashboard extends GoToAction_1.GoToAction {
    navigate(doc, urlString) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        const selector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItem = doc.querySelector(selector);
        if (breaCrumbListItem) {
            const anchor = breaCrumbListItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path);
                }
            }
        }
        return null;
    }
}
exports.JenkinsDashboard = JenkinsDashboard;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JiraLinkIssue = void 0;
const GoToAction_1 = __webpack_require__(19);
class JiraLinkIssue extends GoToAction_1.GoToAction {
    navigate(doc, url) {
        const baseUrl = new URL(url);
        baseUrl.pathname = "";
        const anchor = doc.querySelector("aui-item-link#link-issue a");
        if (anchor) {
            const path = anchor.getAttribute("href");
            if (path) {
                const destinationUrl = new URL(path, baseUrl);
                return destinationUrl.toString();
            }
        }
        return null;
    }
}
exports.JiraLinkIssue = JiraLinkIssue;


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JiraSave = void 0;
class JiraSave {
    perform(doc, url, e) {
        return __awaiter(this, void 0, void 0, function* () {
            const button = this.findSaveButton(doc, url);
            if (button) {
                button.click();
                return true;
            }
            return false;
        });
    }
    findSaveButton(doc, url) {
        const body = doc.querySelector("body#jira");
        if (!body) {
            return null;
        }
        const saveButtonSelectors = [
            "input#create-issue-submit",
            "input#issue-create-submit",
            "input#edit-issue-submit",
            "input#issue-edit-submit",
            "input[name='edit-labels-submit']",
            "input[name='Link'][type='submit'].aui-button",
            "input#log-work-submit",
        ];
        const button = doc.querySelector(saveButtonSelectors.join(", "));
        return button;
    }
}
exports.JiraSave = JiraSave;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsNext = void 0;
const GoToAction_1 = __webpack_require__(19);
const JenkinsHelpers_1 = __webpack_require__(10);
class JenkinsNext extends GoToAction_1.GoToAction {
    navigate(doc, urlString) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        const selector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems) {
            var urlParts = JenkinsHelpers_1.JenkinsHelpers.splitUrlPath(urlString);
            for (var index = urlParts.length - 1; index >= 2; index--) {
                const lastPart = urlParts[index];
                const isUrlToRun = "job" === urlParts[index - 2] &&
                    JenkinsHelpers_1.JenkinsHelpers.isInteger(lastPart);
                if (isUrlToRun) {
                    const nextRun = Number.parseInt(lastPart, 10) + 1;
                    urlParts[index] = nextRun.toString();
                    const rebuiltPath = urlParts.join("/");
                    return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, rebuiltPath);
                }
                else {
                    const mostRecentRunSelector = JenkinsHelpers_1.JenkinsHelpers.getMostRecentRunSelector(bodyElement);
                    const anchor = bodyElement.querySelector(mostRecentRunSelector);
                    if (anchor) {
                        const path = anchor.getAttribute("href");
                        if (path) {
                            return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path);
                        }
                    }
                }
            }
        }
        return null;
    }
}
exports.JenkinsNext = JenkinsNext;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsPipelineSyntax = void 0;
const JenkinsHelpers_1 = __webpack_require__(10);
const GoToAction_1 = __webpack_require__(19);
class JenkinsPipelineSyntax extends GoToAction_1.GoToAction {
    navigate(doc, url) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        /* <a> elements with an href ending in "pipeline-syntax" */
        const selector = "a[href$='/pipeline-syntax']";
        const crumbSelector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const crumbListItems = doc.querySelectorAll(crumbSelector);
        var index = -1;
        if (1 == crumbListItems.length) {
            index = 0;
        }
        else if (bodyElement.querySelector(selector)) {
            index = crumbListItems.length - 1;
        }
        if (index >= 0) {
            const listItem = crumbListItems.item(index);
            const anchor = listItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return JenkinsHelpers_1.JenkinsHelpers.buildUrl(url, path + "pipeline-syntax");
                }
            }
        }
        return null;
    }
}
exports.JenkinsPipelineSyntax = JenkinsPipelineSyntax;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsPrevious = void 0;
const GoToAction_1 = __webpack_require__(19);
const JenkinsHelpers_1 = __webpack_require__(10);
class JenkinsPrevious extends GoToAction_1.GoToAction {
    navigate(doc, urlString) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        const selector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems) {
            var urlParts = JenkinsHelpers_1.JenkinsHelpers.splitUrlPath(urlString);
            for (var index = urlParts.length - 1; index >= 2; index--) {
                const lastPart = urlParts[index];
                const isUrlToRun = "job" === urlParts[index - 2] &&
                    JenkinsHelpers_1.JenkinsHelpers.isInteger(lastPart);
                if (isUrlToRun) {
                    const prevRun = Number.parseInt(lastPart, 10) - 1;
                    urlParts[index] = prevRun.toString();
                    const rebuiltPath = urlParts.join("/");
                    return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, rebuiltPath);
                }
            }
        }
        return null;
    }
}
exports.JenkinsPrevious = JenkinsPrevious;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsUp = void 0;
const GoToAction_1 = __webpack_require__(19);
const JenkinsHelpers_1 = __webpack_require__(10);
class JenkinsUp extends GoToAction_1.GoToAction {
    navigate(doc, urlString) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
        const selector = JenkinsHelpers_1.JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const breaCrumbListItems = doc.querySelectorAll(selector);
        if (breaCrumbListItems && breaCrumbListItems.length > 1) {
            var offset = 2;
            const urlParts = JenkinsHelpers_1.JenkinsHelpers.splitUrlPath(urlString);
            const lastPart = urlParts[urlParts.length - 1];
            // execution/node/5/
            if (urlParts.length > 3 &&
                JenkinsHelpers_1.JenkinsHelpers.isInteger(lastPart) &&
                "node" == urlParts[urlParts.length - 2] &&
                "execution" == urlParts[urlParts.length - 3]) {
                const penultimateItem = breaCrumbListItems.item(breaCrumbListItems.length - 2);
                const anchor = penultimateItem.querySelector("a");
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path + "flowGraphTable/");
                    }
                }
                return null;
            }
            const specialCases = new Set([
                "configure",
                "consoleFull",
                "console",
            ]);
            if (specialCases.has(lastPart)) {
                offset = 1;
            }
            const penultimateItem = breaCrumbListItems.item(breaCrumbListItems.length - offset);
            const anchor = penultimateItem.querySelector("a");
            if (anchor) {
                const path = anchor.getAttribute("href");
                if (path) {
                    return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path);
                }
            }
        }
        return null;
    }
}
exports.JenkinsUp = JenkinsUp;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JiraWorklog = void 0;
const GoToAction_1 = __webpack_require__(19);
/*<a
    id="log-work-link"
    href="/secure/CreateWorklog!default.jspa?id=1645639"
    class="issueaction-log-work aui-icon aui-icon-small aui-iconfont-add issueaction-aui-icon"
    title="Log Work for this issue"
    >
    <span>Log work</span>
</a>*/
class JiraWorklog extends GoToAction_1.GoToAction {
    navigate(doc, url) {
        const baseUrl = new URL(url);
        baseUrl.pathname = "";
        // JIRA v9.7.0
        const anchor = doc.querySelector("aui-item-link#log-work a");
        if (anchor) {
            const path = anchor.getAttribute("href");
            if (path) {
                const destinationUrl = new URL(path, baseUrl);
                return destinationUrl.toString();
            }
        }
        return null;
    }
}
exports.JiraWorklog = JiraWorklog;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyboardShortcut = void 0;
class KeyboardShortcut {
    static asString(ctrl, alt, shift, key) {
        var result = "";
        if (ctrl) {
            result += "Ctrl+";
        }
        if (alt) {
            result += "Alt+";
        }
        if (shift) {
            result += "Shift+";
        }
        result += key;
        return result;
    }
}
exports.KeyboardShortcut = KeyboardShortcut;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Markdown = void 0;
class Markdown {
    render(link) {
        let result = {
            text: `[${link.text}](${link.destination})`,
            html: null,
        };
        return result;
    }
}
exports.Markdown = Markdown;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Textile = void 0;
class Textile {
    render(link) {
        let result = {
            text: `[${link.text}|${link.destination}]`,
            html: null,
        };
        return result;
    }
}
exports.Textile = Textile;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;