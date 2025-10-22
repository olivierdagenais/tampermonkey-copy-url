import {Action} from "../Action";
import {Bitbucket} from "../parsers/Bitbucket";
import {Clipboard} from "../Clipboard";
import {Confluence} from "../parsers/Confluence";
import {Default} from "../parsers/Default";
import {GitHub} from "../parsers/GitHub";
import {GitLab} from "../parsers/GitLab";
import {Jenkins} from "../parsers/Jenkins";
import {Jira} from "../parsers/Jira";
import {Link} from "../Link";
import {Parser} from "../Parser";
import {Renderer} from "../Renderer";
import {ServiceDesk} from "../parsers/ServiceDesk";
import {ServiceNow} from "../parsers/ServiceNow";
import {Zabbix} from "../parsers/Zabbix";

// parsers will be attempted in the order defined here
const parsers: Parser[] = [
    new Confluence(),
    new GitHub(),
    new GitLab(),
    new Bitbucket(),
    new Jira(),
    new Jenkins(),
    new ServiceDesk(),
    new ServiceNow(),
    new Zabbix(),
    // always keep this one LAST in this list!
    new Default(),
];

export class CopyUrl implements Action {
    statusPopup: HTMLDivElement;
    selectedRenderer: Renderer;

    constructor(statusPopup: HTMLDivElement, selectedRenderer: Renderer) {
        this.statusPopup = statusPopup;
        this.selectedRenderer = selectedRenderer;
    }

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
        const clipboard: Clipboard = this.selectedRenderer.render(link);

        const status =
            `Parsed using ${selectedParser.constructor["name"]}:` +
            `<br />Destination: ${link.destination}` +
            `<br />Text: ${link.text}` +
            `<br />Rendered with ${this.selectedRenderer.constructor["name"]}.`;
        var result: any = null;
        result = await this.copyWithAsyncClipboardApi(clipboard);
        if (result != null) {
            result = await this.copyWithGreaseMonkeyClipboardApi(clipboard);
        }
        if (result == null) {
            const successHtml = `${status}<br />Success!`;
            this.showStatusPopup(successHtml);
        }
        else {
            const failureHtml =
                `${status}<br />` +
                `<span style="color:darkred">Failure: ${result}</span>`;
            this.showStatusPopup(failureHtml);
        }
        return true;
    }

    async copyWithGreaseMonkeyClipboardApi(clipboard: Clipboard): Promise<any> {
        if (clipboard.html !== null) {
            GM_setClipboard(clipboard.html, "html");
        }
        else {
            GM_setClipboard(clipboard.text, "text");
        }
        return null;
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
    async copyWithAsyncClipboardApi(clipboard: Clipboard): Promise<any> {
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
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    showStatusPopup(innerHTML: string) {
        // TODO: fade in?
        this.statusPopup.innerHTML = innerHTML;
        this.statusPopup.style.display = "block";
        window.setTimeout(
            () => this.statusPopup.style.display = "none",
            5000 /*ms*/
        );
        console.log(innerHTML);
    }
}
