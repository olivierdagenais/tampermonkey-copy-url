// Keep this list sorted!
import { Clipboard } from "./Clipboard";
import { Default } from "./parsers/Default";
import { GitHub } from "./parsers/GitHub";
import { Html } from "./renderers/Html";
import { Link } from "./Link";
import { Markdown } from "./renderers/Markdown";
import { Renderer } from "./Renderer";
import { Textile } from "./renderers/Textile";
import { Parser } from "./Parser";

const renderers : Renderer[] = [
    new Html(),
    new Markdown(),
    new Textile(),
];

// parsers will be attempted in the order defined here
const parsers : Parser[] = [
    new GitHub(),
    // always keep this one LAST in this list!
    new Default(),
];

var statusPopup : HTMLDivElement | null;

function handleKeydown(this: Window, e: KeyboardEvent) {
    if (e.ctrlKey && e.key == "o") {
        e.preventDefault();
        console.log('asking the parsers...');
        const document : Document = window.document;
        const url : string = window.location.href;
        var link : Link = {
            text: url,
            destination: url,
        };
        for (let i = 0; i < parsers.length; i++) {
            const parser = parsers[i];
            var candidate : Link | null = parser.parseLink(document, url);
            if (candidate) {
                link = candidate;
                break;
            }
        }
        var clipboard: Clipboard;
        if (!e.altKey) {
            console.log('rendering HTML...');
            clipboard = renderers[0].render(link);
        }
        else {
            console.log('rendering Textile...');
            clipboard = renderers[2].render(link);
        }
        var clipboardItemVersions : {[id:string]: Blob;} = {};
        clipboardItemVersions["text/plain"] = new Blob(
            [
                clipboard.text
            ],
            {
                type: "text/plain",
            },
        );

        if (clipboard.html !== null) {
            clipboardItemVersions["text/html"] = new Blob(
                [
                    clipboard.html
                ],
                {
                    type: "text/html",
                },
            );
        }

        if (statusPopup == null) {
            statusPopup = document.createElement("div");
            const styleAttribute = document.createAttribute("style");
            styleAttribute.value = `
                position: absolute;
                top:0;
                right: 0;
                z-index: 1000;
                background-color: white;
                padding: 5px;
                display: none;
            `;
            statusPopup.attributes.setNamedItem(styleAttribute);
            document.body.appendChild(statusPopup);
        }
        const clipboardItem = new ClipboardItem(clipboardItemVersions);
        const data = [clipboardItem];
        navigator.clipboard.write(data).then(
            () => {
                const successHtml = `Success!`;
                if (statusPopup!= null){
                    statusPopup.innerHTML = successHtml;
                }
                else {
                    console.log(successHtml);
                }
            },
            (e) => {
                const failureHtml = `Failure: ${e}`;
                if (statusPopup!= null){
                    statusPopup.innerHTML = failureHtml;
                }
                else {
                    console.log(failureHtml);
                }
            }
        );
        if (statusPopup != null) {
            // TODO: fade in?
            statusPopup.style.display = "block";
            this.window.setTimeout(hideStatusPopup, 5000 /*ms*/);
        }
    }
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

