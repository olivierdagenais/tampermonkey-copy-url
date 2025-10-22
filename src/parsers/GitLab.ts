import {AbstractParser} from "./AbstractParser";
import {Link} from "../Link";
import {GitLabData} from "./GitLabData";

export class GitLab extends AbstractParser {

    parseLink(doc: Document, url: string): Link | null {
        // TODO: implement issues, pull requests, wiki pages, etc.
        return null;
    }

}
