// ==UserScript==
// @name tampermonkey-copy-url
// @version 1.3.0
// @namespace https://olivierdagenais.github.io/
// @description A Tampermonkey userscript to copy nice-looking URLs to the clipboard.
// @author Olivier Dagenais
// @homepage https://github.com/olivierdagenais/tampermonkey-copy-url
// @updateURL https://github.com/olivierdagenais/tampermonkey-copy-url/raw/live/userscript/index.user.js
// @downloadURL https://github.com/olivierdagenais/tampermonkey-copy-url/raw/live/userscript/index.user.js
// @match *://*/*
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
// Keep this list sorted!
const Bitbucket_1 = __webpack_require__(1);
const Default_1 = __webpack_require__(2);
const GitHub_1 = __webpack_require__(3);
const Html_1 = __webpack_require__(4);
const Markdown_1 = __webpack_require__(5);
const Textile_1 = __webpack_require__(6);
const renderers = [new Html_1.Html(), new Markdown_1.Markdown(), new Textile_1.Textile()];
// parsers will be attempted in the order defined here
const parsers = [
    new GitHub_1.GitHub(),
    new Bitbucket_1.Bitbucket(),
    // always keep this one LAST in this list!
    new Default_1.Default(),
];
var statusPopup;
function handleKeydown(e) {
    if (e.ctrlKey && e.key == "o") {
        e.preventDefault();
        console.log("asking the parsers...");
        const document = window.document;
        const url = window.location.href;
        var link = {
            text: url,
            destination: url,
        };
        var selectedParser = parsers[parsers.length - 1];
        for (let i = 0; i < parsers.length; i++) {
            const parser = parsers[i];
            selectedParser = parser;
            var candidate = parser.parseLink(document, url);
            if (candidate) {
                link = candidate;
                break;
            }
        }
        var selectedRenderer = renderers[0];
        if (!e.altKey) {
            selectedRenderer = renderers[0];
        }
        else {
            selectedRenderer = renderers[2];
        }
        const clipboard = selectedRenderer.render(link);
        var clipboardItemVersions = {};
        clipboardItemVersions["text/plain"] = new Blob([clipboard.text], {
            type: "text/plain",
        });
        if (clipboard.html !== null) {
            clipboardItemVersions["text/html"] = new Blob([clipboard.html], {
                type: "text/html",
            });
        }
        if (statusPopup == null) {
            statusPopup = document.createElement("div");
            const styleAttribute = document.createAttribute("style");
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
            document.body.appendChild(statusPopup);
        }
        const clipboardItem = new ClipboardItem(clipboardItemVersions);
        const status = `Parsed using ${selectedParser.constructor["name"]}:` +
            `<br />Destination: ${link.destination}` +
            `<br />Text: ${link.text}` +
            `<br />Rendered with ${selectedRenderer.constructor["name"]}.`;
        const data = [clipboardItem];
        navigator.clipboard.write(data).then(() => {
            const successHtml = `${status}<br />Success!`;
            showStatusPopup(successHtml);
        }, (e) => {
            const failureHtml = `${status}<br />` +
                `<span style="color:darkred">Failure: ${e}</span>`;
            showStatusPopup(failureHtml);
        });
    }
}
function showStatusPopup(innerHTML) {
    if (statusPopup != null) {
        // TODO: fade in?
        statusPopup.innerHTML = innerHTML;
        statusPopup.style.display = "block";
        window.setTimeout(hideStatusPopup, 5000 /*ms*/);
    }
    console.log(innerHTML);
}
function hideStatusPopup() {
    if (statusPopup != null) {
        // TODO: fade out?
        statusPopup.style.display = "none";
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        window.addEventListener("keydown", handleKeydown);
    });
}
main();


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Bitbucket = void 0;
const bbUrlRegex = /https:\/\/(?<host>[^/]+)\/projects\/(?<project>[^/]+)\/repos\/(?<repo>[^/]+)\/(?<rest>.+)/;
const browseUrlRegex = /browse(\/(?<path>[^?#]+)?(\?at=(?<ref>[^#]+))?(#(?<lines>[0-9,-]+))?)?/;
const commitIdRegex = /([a-f0-9]{40})/;
const commitListUrlRegex = /commits\?until=(?<ref>[^&]+)(&.+)?/;
const deepCommitUrlRegex = /commits\/(?<ref>[^#]+)(#(?<path>[^?]+))?/;
const prUrlRegex = /pull-requests\/(?<prId>\d+)(\/(?<extra>.*))?/;
const prTitleRegex = /Pull Request #(?<prId>\d+): (?<summary>.+) - Stash/;
const prExtraRegex = /commits\/(?<ref>[^#]+)(#(?<path>[^?]+)(\?f=(?<lineNumber>\d+))?)?/;
class Bitbucket {
    parseLink(doc, url) {
        const bbUrlMatch = url.match(bbUrlRegex);
        if (!bbUrlMatch || !bbUrlMatch.groups) {
            return null;
        }
        const bbUrlGroups = bbUrlMatch.groups;
        const project = bbUrlGroups.project;
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
        const titleElement = doc.querySelector("html head title");
        if (!titleElement) {
            return null;
        }
        const titleString = titleElement.textContent;
        const prTitleMatch = titleString === null || titleString === void 0 ? void 0 : titleString.match(prTitleRegex);
        if (!prTitleMatch || !prTitleMatch.groups) {
            return null;
        }
        const prTitleGroups = prTitleMatch.groups;
        const summary = prTitleGroups.summary;
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
/* 2 */
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
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitHub = void 0;
class GitHub {
    parseLink(doc, url) {
        var _a;
        if (url.startsWith("https://github.com/")) {
            const titleElement = doc.querySelector("html head title");
            // TODO: implement special handling for PRs, issues, source code
            if (titleElement) {
                var titleString = (_a = titleElement.textContent) !== null && _a !== void 0 ? _a : url;
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
        }
        return null;
    }
}
exports.GitHub = GitHub;


/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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