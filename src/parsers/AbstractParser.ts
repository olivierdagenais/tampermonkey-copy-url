import { Link } from "../Link";
import { Parser } from "../Parser";

export abstract class AbstractParser implements Parser {
    abstract parseLink(doc: Document, url: string): Link | null;

    findTitle(doc: Document): string | null {
        const titleElement: HTMLElement | null =
            doc.querySelector("html head title");
        if (!titleElement) {
            return null;
        }
        return titleElement.textContent;
    }
}
