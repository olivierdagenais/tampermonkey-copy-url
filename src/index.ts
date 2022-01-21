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

async function main(): Promise<void> {
    window.addEventListener("keydown", handleKeydown);
}

main();

