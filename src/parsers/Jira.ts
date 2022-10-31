import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

const issueUrlRegex =
    /https:\/\/(?<host>[^/]+)\/browse\/(?<issueKey>[^?]+)(\?(?<rest>.+))?/;
const issueTitleRegex =
    /\[(?<issueKey>[A-Z][A-Z_0-9]+-[0-9]+)\] (?<summary>.+) - Jira/;
export class Jira extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const issueUrlMatch = url.match(issueUrlRegex);
        if (!issueUrlMatch || !issueUrlMatch.groups) {
            return null;
        }
        const issueUrlGroups = issueUrlMatch.groups;
        const issueKey = issueUrlGroups.issueKey;
        var linkText = `${issueKey}`;

        const titleString = this.findTitle(doc);
        if (titleString) {
            const issueTitleMatch = titleString.match(issueTitleRegex);
            if (issueTitleMatch && issueTitleMatch.groups) {
                const issueTitleGroups = issueTitleMatch.groups;
                const summary = issueTitleGroups.summary;
                if (summary) {
                    linkText += `: ${summary}`;
                }
            }
        }

        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
