import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

export class Confluence extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const bodyElement: HTMLElement | null = doc.querySelector(
            "#com-atlassian-confluence"
        );
        if (!bodyElement) {
            return null;
        }

        const shortlinkElement: HTMLLinkElement | null = doc.querySelector(
            "html > head > link[rel=shortlink]"
        );
        if (shortlinkElement) {
            url = shortlinkElement.href;
        }

        const titleElement: HTMLElement | null =
            doc.querySelector("#title-text");
        if (!titleElement || !titleElement.textContent) {
            return null;
        }
        var linkText = titleElement.textContent.trim();
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
