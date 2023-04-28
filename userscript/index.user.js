// ==UserScript==
// @name tampermonkey-copy-url
// @version 2.4.0
// @namespace https://olivierdagenais.github.io/
// @description A Tampermonkey userscript to copy nice-looking URLs to the clipboard.
// @author Olivier Dagenais
// @homepage https://github.com/olivierdagenais/tampermonkey-copy-url
// @updateURL https://github.com/olivierdagenais/tampermonkey-copy-url/raw/release/2.4/userscript/index.user.js
// @downloadURL https://github.com/olivierdagenais/tampermonkey-copy-url/raw/release/2.4/userscript/index.user.js
// @match *://*/*
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
const Html_1 = __webpack_require__(12);
const JenkinsBuild_1 = __webpack_require__(13);
const JenkinsConfigure_1 = __webpack_require__(15);
const JenkinsConsole_1 = __webpack_require__(16);
const JenkinsCredentials_1 = __webpack_require__(17);
const JenkinsDashboard_1 = __webpack_require__(18);
const JiraLinkIssue_1 = __webpack_require__(19);
const JenkinsNext_1 = __webpack_require__(20);
const JenkinsPipelineSyntax_1 = __webpack_require__(21);
const JenkinsPrevious_1 = __webpack_require__(22);
const JenkinsUp_1 = __webpack_require__(23);
const JiraWorklog_1 = __webpack_require__(24);
const KeyboardShortcut_1 = __webpack_require__(25);
const Markdown_1 = __webpack_require__(26);
const Textile_1 = __webpack_require__(27);
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
        KeyboardShortcut_1.KeyboardShortcut.asString(false, false, false, "r"), [
            new JenkinsDashboard_1.JenkinsDashboard(),
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
        if (e.target &&
            // TODO: we could exclude these when modifiers aren't used
            !(e.target instanceof HTMLInputElement) &&
            !(e.target instanceof HTMLTextAreaElement)) {
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
        if (jiraBody) {
            const anchor = jiraBody.querySelector("a#home_link[accesskey=d]");
            if (anchor) {
                anchor.removeAttribute("accesskey");
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
const Jenkins_1 = __webpack_require__(7);
const Jira_1 = __webpack_require__(9);
const ServiceDesk_1 = __webpack_require__(10);
const ServiceNow_1 = __webpack_require__(11);
// parsers will be attempted in the order defined here
const parsers = [
    new Confluence_1.Confluence(),
    new GitHub_1.GitHub(),
    new Bitbucket_1.Bitbucket(),
    new Jira_1.Jira(),
    new Jenkins_1.Jenkins(),
    new ServiceDesk_1.ServiceDesk(),
    new ServiceNow_1.ServiceNow(),
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
     * Attempts to copy the specified data to the clipboard using the standardized (async)
     * Clipboard API as per https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
     *
     * Restrictions: only works when the page is served over a secure channel (or via localhost)
     * as per https://stackoverflow.com/a/65996386/98903
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
const deepCommitUrlRegex = /commits\/(?<ref>[^#]+)(#(?<path>[^?]+))?/;
const prUrlRegex = /pull-requests\/(?<prId>\d+)(\/(?<extra>.*))?/;
const prExtraRegex = /commits\/(?<ref>[^#]+)(#(?<path>[^?]+)(\?f=(?<lineNumber>\d+))?)?/;
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
        const ref = this.getPrettyRef(deepCommitUrlGroups);
        const path = deepCommitUrlGroups.path;
        var prefix = "";
        if (path) {
            prefix += `${path} at `;
        }
        const linkText = `${prefix}commit ${ref} in ${project}/${repo}`;
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
    parsePullRequest(doc, url, project, repo, prUrlGroups) {
        const prId = prUrlGroups.prId;
        const extra = prUrlGroups.extra;
        const h2Element = doc.querySelector("html > body h2.pull-request-title");
        if (!h2Element) {
            return null;
        }
        const summary = h2Element.textContent;
        var prefix = "";
        if (extra) {
            const prExtraMatch = extra.match(prExtraRegex);
            if (prExtraMatch && prExtraMatch.groups) {
                const prExtraGroups = prExtraMatch.groups;
                if (prExtraGroups.lineNumber) {
                    prefix += `line ${prExtraGroups.lineNumber} of `;
                }
                if (prExtraGroups.path) {
                    prefix += `${prExtraGroups.path} at `;
                }
                const ref = this.getPrettyRef(prExtraGroups);
                prefix += `commit ${ref} in `;
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
                    const path = refSpecAndPath.substring(refSpec.length + 1 /* the slash */);
                    titleString = `${path} at ${refSpec} in ${blobUrlGroups.userOrOrg}/${blobUrlGroups.repo}`;
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
exports.Jenkins = void 0;
const AbstractParser_1 = __webpack_require__(3);
const JenkinsHelpers_1 = __webpack_require__(8);
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
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsHelpers = void 0;
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
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Jira = void 0;
const AbstractParser_1 = __webpack_require__(3);
const issueUrlRegex = /https:\/\/(?<host>[^/]+)\/([^/]+\/)*browse\/(?<issueKey>[^?]+)(\?(?<rest>.+))?/;
class Jira extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        const issueUrlMatch = url.match(issueUrlRegex);
        if (!issueUrlMatch || !issueUrlMatch.groups) {
            return null;
        }
        const issueUrlGroups = issueUrlMatch.groups;
        const issueKey = issueUrlGroups.issueKey;
        var linkText = `${issueKey}`;
        const h1Element = doc.querySelector("#summary-val");
        if (h1Element) {
            const summary = h1Element.textContent;
            if (summary) {
                linkText += `: ${summary}`;
            }
        }
        const confMacro = "?src=confmacro";
        if (url.endsWith(confMacro)) {
            url = url.substring(0, url.length - confMacro.length);
        }
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
exports.Jira = Jira;


/***/ }),
/* 10 */
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
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceNow = void 0;
const AbstractParser_1 = __webpack_require__(3);
const snUrlRegex = /https:\/\/(?<host>[^/]+)\/esc\/\?id=(?<rest>.+)/;
class ServiceNow extends AbstractParser_1.AbstractParser {
    parseLink(doc, url) {
        var _a, _b, _c;
        const snUrlMatch = url.match(snUrlRegex);
        if (!snUrlMatch || !snUrlMatch.groups) {
            return null;
        }
        var linkText = ``;
        const divElement = doc.querySelector("#data\\.number\\.name");
        if (divElement) {
            const incidentNumber = divElement.textContent;
            if (incidentNumber) {
                linkText += incidentNumber.trim();
            }
            var subject;
            // #variables-toggle > div:nth-child(3) > label > b
            const variablesToggle = doc.querySelector("#variables-toggle");
            if (variablesToggle) {
                const labels = variablesToggle.querySelectorAll("div > label > b");
                for (let i = 0; i < labels.length; i++) {
                    const bold = labels.item(i);
                    const boldText = (_a = bold.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                    if ("Subject" == boldText) {
                        const parentDiv = (_b = bold.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                        const span = parentDiv === null || parentDiv === void 0 ? void 0 : parentDiv.querySelector("div > div> span");
                        subject = (_c = span === null || span === void 0 ? void 0 : span.textContent) === null || _c === void 0 ? void 0 : _c.trim();
                    }
                }
            }
            if (!subject || subject === undefined) {
                const h2Element = doc.querySelector("#short-desc");
                if (h2Element) {
                    subject = h2Element.textContent;
                }
            }
            if (subject) {
                linkText += `: ${subject.trim()}`;
            }
        }
        const result = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
exports.ServiceNow = ServiceNow;


/***/ }),
/* 12 */
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
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsBuild = void 0;
const JenkinsHelpers_1 = __webpack_require__(8);
const GoToAction_1 = __webpack_require__(14);
class JenkinsBuild extends GoToAction_1.GoToAction {
    navigate(doc, url) {
        const bodyElement = JenkinsHelpers_1.JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }
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
                    return JenkinsHelpers_1.JenkinsHelpers.buildUrl(url, path + "build", "delay=0sec");
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
                            return JenkinsHelpers_1.JenkinsHelpers.buildUrl(url, href + "build", "delay=0sec");
                        }
                    }
                }
            }
        }
        return null;
    }
}
exports.JenkinsBuild = JenkinsBuild;


/***/ }),
/* 14 */
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
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsConfigure = void 0;
const GoToAction_1 = __webpack_require__(14);
const JenkinsHelpers_1 = __webpack_require__(8);
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
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsConsole = void 0;
const GoToAction_1 = __webpack_require__(14);
const JenkinsHelpers_1 = __webpack_require__(8);
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
                        return (JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path) +
                            "consoleFull");
                    }
                }
                return null;
            }
            else {
                const mostRecentRunSelector = "tr.build-row a.build-status-link";
                const anchor = bodyElement.querySelector(mostRecentRunSelector);
                if (anchor) {
                    const path = anchor.getAttribute("href");
                    if (path) {
                        return JenkinsHelpers_1.JenkinsHelpers.buildUrl(urlString, path + "Full");
                    }
                }
            }
        }
        return null;
    }
}
exports.JenkinsConsole = JenkinsConsole;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsCredentials = void 0;
const JenkinsHelpers_1 = __webpack_require__(8);
const GoToAction_1 = __webpack_require__(14);
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
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsDashboard = void 0;
const GoToAction_1 = __webpack_require__(14);
const JenkinsHelpers_1 = __webpack_require__(8);
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
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JiraLinkIssue = void 0;
const GoToAction_1 = __webpack_require__(14);
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
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsNext = void 0;
const GoToAction_1 = __webpack_require__(14);
const JenkinsHelpers_1 = __webpack_require__(8);
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
                    const mostRecentRunSelector = "tr.build-row a.build-link";
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
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsPipelineSyntax = void 0;
const JenkinsHelpers_1 = __webpack_require__(8);
const GoToAction_1 = __webpack_require__(14);
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
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsPrevious = void 0;
const GoToAction_1 = __webpack_require__(14);
const JenkinsHelpers_1 = __webpack_require__(8);
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
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JenkinsUp = void 0;
const GoToAction_1 = __webpack_require__(14);
const JenkinsHelpers_1 = __webpack_require__(8);
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
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JiraWorklog = void 0;
const GoToAction_1 = __webpack_require__(14);
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
/* 25 */
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
/* 26 */
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
/* 27 */
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