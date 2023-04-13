// Keep this list sorted!
import { Action } from "./Action";
import { Bitbucket } from "./parsers/Bitbucket";
import { Clipboard } from "./Clipboard";
import { Confluence } from "./parsers/Confluence";
import { Default } from "./parsers/Default";
import { GitHub } from "./parsers/GitHub";
import { Html } from "./renderers/Html";
import { Jira } from "./parsers/Jira";
import { JiraWorklog } from "./actions/JiraWorklog";
import { Jenkins } from "./parsers/Jenkins";
import { KeyboardShortcut } from "./KeyboardShortcut";
import { Link } from "./Link";
import { Markdown } from "./renderers/Markdown";
import { Renderer } from "./Renderer";
import { ServiceDesk } from "./parsers/ServiceDesk";
import { ServiceNow } from "./parsers/ServiceNow";
import { Textile } from "./renderers/Textile";
import { Parser } from "./Parser";

class CopyUrlAction implements Action {
    async perform(
        doc: Document,
        url: string,
        e: KeyboardEvent
    ): Promise<boolean> {
        e.preventDefault();
        console.log("asking the parsers...");
        var link: Link = {
            text: url,
            destination: url,
        };
        var selectedParser: Parser = parsers[parsers.length - 1];
        for (let i = 0; i < parsers.length; i++) {
            const parser = parsers[i];
            selectedParser = parser;
            var candidate: Link | null = parser.parseLink(doc, url);
            if (candidate) {
                link = candidate;
                break;
            }
        }
        var selectedRenderer: Renderer = new Html();
        const clipboard: Clipboard = selectedRenderer.render(link);

        if (statusPopup == null) {
            statusPopup = doc.createElement("div");
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
        }
        const status =
            `Parsed using ${selectedParser.constructor["name"]}:` +
            `<br />Destination: ${link.destination}` +
            `<br />Text: ${link.text}` +
            `<br />Rendered with ${selectedRenderer.constructor["name"]}.`;
        var result: any = null;
        result = await copyWithAsyncClipboardApi(clipboard);
        if (result != null) {
            result = await copyWithGreaseMonkeyClipboardApi(clipboard);
        }
        if (result == null) {
            const successHtml = `${status}<br />Success!`;
            showStatusPopup(successHtml);
        } else {
            const failureHtml =
                `${status}<br />` +
                `<span style="color:darkred">Failure: ${result}</span>`;
            showStatusPopup(failureHtml);
        }

        return true;
    }
}

// prettier-ignore
const shortcuts : Map<string, Array<Action>> = new Map([
    [
        KeyboardShortcut.asString(false, false, false, "f"), [
            new JiraWorklog(),
        ]
    ],
    [
        KeyboardShortcut.asString(true, false, false, "o"), [
            new CopyUrlAction(),
        ]
    ],
]);

// parsers will be attempted in the order defined here
const parsers: Parser[] = [
    new Confluence(),
    new GitHub(),
    new Bitbucket(),
    new Jira(),
    new Jenkins(),
    new ServiceDesk(),
    new ServiceNow(),
    // always keep this one LAST in this list!
    new Default(),
];

var statusPopup: HTMLDivElement | null;
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

async function copyWithGreaseMonkeyClipboardApi(
    clipboard: Clipboard
): Promise<any> {
    if (clipboard.html !== null) {
        GM_setClipboard(clipboard.html, "html");
    } else {
        GM_setClipboard(clipboard.text, "text");
    }
    return null;
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
async function copyWithAsyncClipboardApi(clipboard: Clipboard): Promise<any> {
    var clipboardItemVersions: { [id: string]: Blob } = {};
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
        await navigator.clipboard.write(data);
        return null;
    } catch (error) {
        console.log(error);
        return error;
    }
}

function showStatusPopup(innerHTML: string) {
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

async function main(): Promise<void> {
    window.addEventListener("keydown", handleKeydown);
}

main();
