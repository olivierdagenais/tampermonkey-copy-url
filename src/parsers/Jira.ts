import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

const issueUrlRegex =
    /https:\/\/(?<host>[^/]+)\/([^/]+\/)*browse\/(?<issueKey>[^?]+)(\?(?<rest>.+))?/;
export class Jira extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const issueUrlMatch = url.match(issueUrlRegex);
        if (!issueUrlMatch || !issueUrlMatch.groups) {
            return null;
        }
        const issueUrlGroups = issueUrlMatch.groups;
        const issueKey = issueUrlGroups.issueKey;
        var linkText = `${issueKey}`;

        const h1Element : HTMLElement | null = doc.querySelector("#summary-val");
        if (h1Element) {
            const summary = h1Element.textContent;
            if (summary) {
                linkText += `: ${summary}`;
            }
        }

        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
