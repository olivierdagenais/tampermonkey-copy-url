import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

export class Confluence extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        var linkText = `TODO`;
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
