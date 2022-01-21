// ==UserScript==
// @name tampermonkey-copy-url
// @version 1.0.0
// @namespace https://olivierdagenais.github.io/
// @description A Tampermonkey userscript to copy nice-looking URLs to the clipboard.
// @author Olivier Dagenais
// @homepage https://github.com/olivierdagenais/tampermonkey-copy-url
// @match https://github.com/*
// @require https://code.jquery.com/jquery-3.2.1.min.js
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
const Default_1 = __webpack_require__(1);
const GitHub_1 = __webpack_require__(2);
const Html_1 = __webpack_require__(3);
const Markdown_1 = __webpack_require__(4);
const Textile_1 = __webpack_require__(5);
const renderers = [
    new Html_1.Html(),
    new Markdown_1.Markdown(),
    new Textile_1.Textile(),
];
// parsers will be attempted in the order defined here
const parsers = [
    new GitHub_1.GitHub(),
    // always keep this one LAST in this list!
    new Default_1.Default(),
];
function handleKeydown(e) {
    if (e.ctrlKey && e.key == "o") {
        e.preventDefault();
        console.log('asking the parsers...');
        const document = window.document;
        const url = window.location.href;
        var link = {
            text: url,
            destination: url,
        };
        for (let i = 0; i < parsers.length; i++) {
            const parser = parsers[i];
            var candidate = parser.parseLink(document, url);
            if (candidate) {
                link = candidate;
                break;
            }
        }
        var clipboard;
        if (e.shiftKey) {
            console.log('rendering HTML...');
            clipboard = renderers[0].render(link);
        }
        else {
            console.log('rendering Textile...');
            clipboard = renderers[2].render(link);
        }
        GM_setClipboard(clipboard.data, clipboard.typeInfo);
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
exports.Default = void 0;
class Default {
    parseLink(doc, url) {
        var _a;
        const titleElement = doc.querySelector("html head title");
        const result = {
            text: (_a = titleElement === null || titleElement === void 0 ? void 0 : titleElement.innerHTML) !== null && _a !== void 0 ? _a : url,
            destination: url,
        };
        return result;
    }
}
exports.Default = Default;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitHub = void 0;
class GitHub {
    parseLink(doc, url) {
        if (url.startsWith("https://github.com/")) {
            const titleElement = doc.querySelector("html head title");
            // TODO: implement special handling for PRs, issues, source code
            if (titleElement) {
                const result = {
                    // TODO: we'll want to escape that HTML into text!
                    text: titleElement.innerHTML,
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
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Html = void 0;
class Html {
    render(link) {
        let result = {
            data: `<a href="${link.destination}">${link.text}</a>`,
            typeInfo: "text"
        };
        return result;
    }
}
exports.Html = Html;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Markdown = void 0;
class Markdown {
    render(link) {
        let result = {
            data: `[${link.text}](${link.destination})`,
            typeInfo: "text"
        };
        return result;
    }
}
exports.Markdown = Markdown;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Textile = void 0;
class Textile {
    render(link) {
        let result = {
            data: `[${link.text}|${link.destination}]`,
            typeInfo: "text"
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