import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";
const issuePathRegex =
    /browse\/(?<issueKey>[A-Z][A-Z0-9]+-\d+)/;
export class Jira extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const u = new URL(url);
        const path = u.pathname;
        if (path.indexOf("browse/") == -1) {
            return null;
        }
        const pathMatch = path.match(issuePathRegex);
        if (!pathMatch || !pathMatch.groups) {
            return null;
        }
        const pathGroups = pathMatch.groups;
        const issueKey = pathGroups.issueKey;
        var linkText = `${issueKey}`;

        const h1Element: HTMLElement | null = doc.querySelector("#summary-val");
        if (h1Element) {
            const summary = h1Element.textContent;
            if (summary) {
                linkText += `: ${summary}`;
            }
        }

        const cleanUrl = new URL(url);
        cleanUrl.search = "";
        cleanUrl.hash = "";

        const result: Link = {
            text: linkText,
            destination: cleanUrl.toString(),
        };
        return result;
    }
}
