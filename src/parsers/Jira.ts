import { Link } from "../Link";
import { Parser } from "../Parser";

export class Jira implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        return null;
    }
}
