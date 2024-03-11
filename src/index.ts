// Keep this list sorted!
import { Action } from "./Action";
import { CopyUrl } from "./actions/CopyUrl";
import { Html } from "./renderers/Html";
import { JenkinsBuild } from "./actions/JenkinsBuild";
import { JenkinsConfigure } from "./actions/JenkinsConfigure";
import { JenkinsConsole } from "./actions/JenkinsConsole";
import { JenkinsCredentials } from "./actions/JenkinsCredentials";
import { JenkinsDashboard } from "./actions/JenkinsDashboard";
import { JiraLinkIssue } from "./actions/JiraLinkIssue";
import { JiraSave } from "./actions/JiraSave";
import { JenkinsNext } from "./actions/JenkinsNext";
import { JenkinsPipelineSyntax } from "./actions/JenkinsPipelineSyntax";
import { JenkinsPrevious } from "./actions/JenkinsPrevious";
import { JenkinsUp } from "./actions/JenkinsUp";
import { JiraWorklog } from "./actions/JiraWorklog";
import { KeyboardShortcut } from "./KeyboardShortcut";
import { Markdown } from "./renderers/Markdown";
import { Textile } from "./renderers/Textile";
import CodeMirror from "codemirror";

const statusPopup: HTMLDivElement = window.document.createElement("div");

// prettier-ignore
const shortcuts : Map<string, Array<Action>> = new Map([
    [
        KeyboardShortcut.asString(false, false, false, "b"), [
            new JenkinsBuild(),
        ]
    ],
    [
        KeyboardShortcut.asString(false, false, false, "c"), [
            new JenkinsConfigure(),
        ]
    ],
    [
        KeyboardShortcut.asString(false, false, false, "f"), [
            new JenkinsConsole(),
            new JiraWorklog(),
        ]
    ],
    [
        KeyboardShortcut.asString(false, false, false, "k"), [
            new JenkinsCredentials(),
        ]
    ],
    [
        KeyboardShortcut.asString(false, false, false, "l"), [
            new JiraLinkIssue(),
        ]
    ],
    [
        KeyboardShortcut.asString(false, false, false, "n"), [
            new JenkinsNext(),
        ]
    ],
    [
        KeyboardShortcut.asString(true, false, false, "o"), [
            new CopyUrl(statusPopup, new Markdown()),
        ]
    ],
    [
        KeyboardShortcut.asString(true, true, false, "o"), [
            new CopyUrl(statusPopup, new Textile()),
        ]
    ],
    [
        // Ctrl+Alt+o with FR-CA keyboard on Windows 10 yields a "Section Sign"
        KeyboardShortcut.asString(false, false, false, "\u00a7"), [
            new CopyUrl(statusPopup, new Textile()),
        ]
    ],
    [
        KeyboardShortcut.asString(false, false, false, "p"), [
            new JenkinsPipelineSyntax(),
            new JenkinsPrevious(),
        ]
    ],
    [
        KeyboardShortcut.asString(true, true, false, "p"), [
            new CopyUrl(statusPopup, new Html()),
        ]
    ],
    [
        // Ctrl+Alt+p with FR-CA keyboard on Windows 10 yields a "Pilcrow Sign"
        KeyboardShortcut.asString(false, false, false, "\u00b6"), [
            new CopyUrl(statusPopup, new Html()),
        ]
    ],
    [
        KeyboardShortcut.asString(false, false, false, "r"), [
            new JenkinsDashboard(),
        ]
    ],
    [
        KeyboardShortcut.asString(false, true, false, "s"), [
            new JiraSave(),
        ]
    ],
    [
        KeyboardShortcut.asString(false, false, false, "u"), [
            new JenkinsUp(),
        ]
    ],
]);

async function handleKeydown(this: Window, e: KeyboardEvent) {
    const document: Document = window.document;
    const url: string = window.location.href;
    // prettier-ignore
    if (
        e.ctrlKey ||
        e.altKey ||
        e.target &&
        (
            !(e.target instanceof HTMLInputElement) &&
            !(e.target instanceof HTMLTextAreaElement)
        )
    ) {
        const shortcutString = KeyboardShortcut.asString(
            e.ctrlKey,
            e.altKey,
            e.shiftKey,
            e.key
        );
        if (shortcuts.has(shortcutString)) {
            const actionList = shortcuts.get(shortcutString);
            if (actionList) {
                var handled = false;
                for (const action of actionList) {
                    handled = await action.perform(document, url, e);
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
}

async function handleBitbucketSearchLoaded(
    mutations: MutationRecord[],
    observer: MutationObserver
) {
    if (bitbucketSearchDiv) {
        const searchBox: HTMLInputElement | null =
            bitbucketSearchDiv.querySelector(
                "form#search-form input.search-query"
            );
        if (searchBox) {
            observer.disconnect();
            searchBox.focus({ preventScroll: false });
        }
    } else {
        observer.disconnect();
    }
}
const codeSearchObserver = new MutationObserver(handleBitbucketSearchLoaded);
const codeSearchObserverConfig: MutationObserverInit = {
    subtree: true,
    childList: true,
};
var bitbucketSearchDiv: HTMLDivElement | null;

interface CodeMirrorWrappedDiv extends HTMLDivElement {
    CodeMirror?: CodeMirror.Editor;
}

const focusedClass = "CodeMirror-focused";
async function handleCodeMirrorFocus(
    mutations: MutationRecord[],
    observer: MutationObserver
) {
    for (const mutation of mutations) {
        switch (mutation.type) {
            case "attributes":
                switch (mutation.attributeName) {
                    case "class":
                        const div: CodeMirrorWrappedDiv | null =
                            mutation.target as CodeMirrorWrappedDiv;
                        if (div) {
                            if (
                                div.classList.contains(focusedClass) &&
                                mutation.oldValue?.indexOf(focusedClass) == -1
                            ) {
                                const editor = div.CodeMirror;
                                if (editor) {
                                    patchCodeMirrorEditor(editor, div);
                                }
                            }
                        }
                }
        }
    }
}

function patchCodeMirrorEditor(editor: CodeMirror.Editor, div: HTMLDivElement) {
    console.log("Found a CodeMirror, patching Home & End...");
    var extraKeys = editor.getOption("extraKeys");
    if (!extraKeys || typeof extraKeys === "string") {
        extraKeys = {};
        editor.setOption("extraKeys", extraKeys);
    }
    extraKeys.Home = "goLineLeftSmart";
    extraKeys.End = (cm) =>
        cm.extendSelectionsBy((range) => {
            const top = cm.cursorCoords(range.head, "div").top + 5;
            const coords = cm.coordsChar(
                {
                    left: div.offsetWidth,
                    top: top,
                },
                "div"
            );
            const doc = cm.getDoc();
            const currentLine = doc.getLine(coords.line);
            if (coords.ch != 0 && coords.ch != currentLine.length) {
                coords.ch = coords.ch - 1;
            }
            return coords;
        });
}
const codeMirrorObserver = new MutationObserver(handleCodeMirrorFocus);
const codeMirrorObserverConfig: MutationObserverInit = {
    attributeFilter: ["class"],
    attributeOldValue: true,
    subtree: true,
};
var bitbucketBody: HTMLBodyElement | null;

async function main(): Promise<void> {
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
    } else if (bitbucketBody) {
        bitbucketSearchDiv = bitbucketBody.querySelector("div#codesearch");
        if (bitbucketSearchDiv) {
            codeSearchObserver.observe(
                bitbucketSearchDiv,
                codeSearchObserverConfig
            );
        } else {
            codeMirrorObserver.observe(bitbucketBody, codeMirrorObserverConfig);
        }
    }

    window.addEventListener("keydown", handleKeydown);
}

main();
