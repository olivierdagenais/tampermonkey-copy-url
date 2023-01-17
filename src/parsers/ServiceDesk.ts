import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

const urlRegex = /https:\/\/(?<host>[^/]+)\/WorkOrder.do\?(?<rest>.+)/
export class ServiceDesk extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const urlMatch = url.match(urlRegex);
        if (!urlMatch || !urlMatch.groups) {
            return null;
        }

        var linkText = `ServiceDesk`;

        const spanIdElement : HTMLElement | null = doc.querySelector("#request-id");
        if (spanIdElement) {
            const requestId = spanIdElement.textContent?.trim();
            if (requestId) {
                linkText += ` ${requestId}`;
            }
        }

        const spanSubjectElement : HTMLElement | null = doc.querySelector("#req_subject");
        if (spanSubjectElement) {
            const requestSubject = spanSubjectElement.textContent?.trim();
            if (requestSubject) {
                linkText += `: ${requestSubject}`;
            }
        }
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
