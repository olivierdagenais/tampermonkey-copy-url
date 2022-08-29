import { Link } from "../Link";
import { Parser } from "../Parser";

export class GitHub implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        if (url.startsWith("https://github.com/")) {
            const titleElement : HTMLElement | null = doc.querySelector("html head title");
            // TODO: implement special handling for PRs, issues, source code
            if (titleElement) {
                var titleString = titleElement.textContent ?? url;
                const prOrIssueUrlRegex = /https:\/\/github.com\/(?<userOrOrg>[^/]+)\/(?<repo>[^/]+)\/(?:.+)\/(?<id>\d+)/;
                const prOrIssueUrlMatch = url.match(prOrIssueUrlRegex);
                if (prOrIssueUrlMatch) {
                    const prOrIssueTitleRegex = /(?<title>.+) · (?:.+) #(?<id>\d+) · (?<userOrOrg>[^/]+)\/(?<repo>.+)/;
                    const prOrIssueTitleMatch = titleString.match(prOrIssueTitleRegex);
                    if (prOrIssueTitleMatch && prOrIssueTitleMatch.groups) {
                        const groups = prOrIssueTitleMatch.groups;
                        titleString = `${groups.userOrOrg}/${groups.repo}#${groups.id}: ${groups.title}`;
                    }
                    const result : Link = {
                        text: titleString,
                        destination: url,
                    };
                    return result;
                }
                const result : Link = {
                    text: titleString,
                    destination: url,
                };
                return result;
            }
        }
        return null;
    }
}
