// Keep this list sorted!
import { Bitbucket } from "./parsers/Bitbucket";
import { Clipboard } from "./Clipboard";
import { Confluence } from "./parsers/Confluence";
import { Default } from "./parsers/Default";
import { GitHub } from "./parsers/GitHub";
import { Html } from "./renderers/Html";
import { Jira } from "./parsers/Jira";
import { Jenkins } from "./parsers/Jenkins";
import { Link } from "./Link";
import { Markdown } from "./renderers/Markdown";
import { Renderer } from "./Renderer";
import { ServiceDesk } from "./parsers/ServiceDesk";
import { ServiceNow } from "./parsers/ServiceNow";
import { Textile } from "./renderers/Textile";
import { Parser } from "./Parser";

const renderers: Renderer[] = [new Html(), new Markdown(), new Textile()];

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
    if (e.ctrlKey && e.key == "o") {
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
            var candidate: Link | null = parser.parseLink(document, url);
            if (candidate) {
                link = candidate;
                break;
            }
        }
        var selectedRenderer: Renderer = renderers[0];
        if (!e.altKey) {
            selectedRenderer = renderers[0];
        } else {
            selectedRenderer = renderers[2];
        }
        const clipboard: Clipboard = selectedRenderer.render(link);

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
    const clipboardItem = new ClipboardItem(clipboardItemVersions);
    const data = [clipboardItem];
    try {
        await navigator.clipboard.write(data);
        return null;
    } catch (error) {
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
