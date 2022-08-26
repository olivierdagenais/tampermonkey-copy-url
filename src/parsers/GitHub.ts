import { Link } from "../Link";
import { Parser } from "../Parser";

export class GitHub implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        if (url.startsWith("https://github.com/")) {
            const titleElement : HTMLElement | null = doc.querySelector("html head title");
            // TODO: implement special handling for PRs, issues, source code
            if (titleElement) {
                const result : Link = {
                    text: titleElement.textContent ?? url,
                    destination: url,
                };
                return result;
            }
        }
        return null;
    }
}
