import { Link } from "../Link";
import { Parser } from "../Parser";

export class Default implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        const titleElement : HTMLElement | null = doc.querySelector("html head title");
        const result : Link = {
            text: titleElement?.textContent ?? url,
            destination: url,
        };
        return result;
    }
}
