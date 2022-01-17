import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Renderer } from "../Renderer";

export class Textile implements Renderer {
    render(link: Link): Clipboard {
        let result : Clipboard = {
            data: `[${link.text}|${link.destination}]`,
            typeInfo: "text"
        };
        return result;
    }
}
