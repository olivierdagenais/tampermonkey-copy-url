import {AbstractParser} from "./AbstractParser";
import {Link} from "../Link";
import {GitLabData} from "./GitLabData";

export class GitLab extends AbstractParser {

    parseLink(doc: Document, url: string): Link | null {
        const siteNameSelector =
            "html head meta[property='og:site_name'][content='GitLab']";
        const siteName: HTMLElement | null =
            doc.querySelector(siteNameSelector);
        if (!siteName) {
            return null;
        }
        const data = new GitLabData(doc);
        let linkText: string;
        switch (data.page) {
            case "projects:show":
                linkText = `${data.projectFullPath}: ${data.description}`;
                break;
            // TODO: implement issues, pull requests, wiki pages, etc.
            default:
                linkText = data.page;
                break;
        }
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }

}
