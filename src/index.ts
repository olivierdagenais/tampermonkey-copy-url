// Keep this list sorted!
import { Clipboard } from "./Clipboard";
import { Html } from "./renderers/Html";
import { Link } from "./Link";
import { Markdown } from "./renderers/Markdown";
import { Renderer } from "./Renderer";
import { Textile } from "./renderers/Textile";

const renderers : Renderer[] = [
    new Html(),
    new Markdown(),
    new Textile(),
];

function handleKeydown(this: Window, e: KeyboardEvent) {
    if (e.ctrlKey && e.key == "o") {
        e.preventDefault();
        console.log('asking the parsers...');
        const link : Link = {
            destination: 'https://github.com/olivierdagenais/tampermonkey-copy-url',
            text: 'olivierdagenais/tampermonkey-copy-url',
        };
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

