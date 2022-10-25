import { Link } from "../Link";
import { Parser } from "../Parser";

export class Bitbucket implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        return null;
    }
}
