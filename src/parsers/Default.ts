import { Link } from "../Link";
import { Parser } from "../Parser";

export class Default implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        const titleElement : HTMLElement | null = doc.querySelector("html head title");
        if (titleElement) {
            const result : Link = {
                text: titleElement.innerHTML,
                destination: url,
            };
            return result;
        }
        else {
            const result : Link = {
                text: url,
                destination: url,
            };
            return result;
        }
    }
}
