import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Renderer } from "../Renderer";

export class Html implements Renderer {
    render(link: Link): Clipboard {
        let result : Clipboard = {
            text: link.text,
            html: `<a href="${link.destination}">${link.text}</a>`,
        };
        return result;
    }
}
