import { Link } from "./Link";

export interface Parser {
    parseLink(doc: Document, url: string): Link | null;
}
