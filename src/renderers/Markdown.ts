import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Renderer } from "../Renderer";

export class Markdown implements Renderer {
    render(link: Link): Clipboard {
        let result: Clipboard = {
            text: `[${link.text}](${link.destination})`,
            html: null,
        };
        return result;
    }
}
