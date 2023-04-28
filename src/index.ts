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
import { JenkinsNext } from "./actions/JenkinsNext";
import { JenkinsPipelineSyntax } from "./actions/JenkinsPipelineSyntax";
import { JenkinsPrevious } from "./actions/JenkinsPrevious";
import { JenkinsUp } from "./actions/JenkinsUp";
import { JiraWorklog } from "./actions/JiraWorklog";
import { KeyboardShortcut } from "./KeyboardShortcut";
import { Markdown } from "./renderers/Markdown";
import { Textile } from "./renderers/Textile";

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
        KeyboardShortcut.asString(false, false, false, "r"), [
            new JenkinsDashboard(),
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
    if (
        e.target &&
        // TODO: we could exclude these when modifiers aren't used
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
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

    window.addEventListener("keydown", handleKeydown);
}

main();
