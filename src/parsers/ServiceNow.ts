import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

const snUrlRegex = /https:\/\/(?<host>[^/]+)\/esc\/\?id=(?<rest>.+)/;
export class ServiceNow extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const snUrlMatch = url.match(snUrlRegex);
        if (snUrlMatch && snUrlMatch.groups) {
            var linkText = ``;
            const divElement: HTMLElement | null = doc.querySelector(
                "#data\\.number\\.name"
            );
            if (divElement) {
                const incidentNumber = divElement.textContent;
                if (incidentNumber) {
                    linkText += incidentNumber.trim();
                }
                var subject: string | undefined | null;
                // #variables-toggle > div:nth-child(3) > label > b
                const variablesToggle: HTMLElement | null =
                    doc.querySelector("#variables-toggle");
                if (variablesToggle) {
                    const labels =
                        variablesToggle.querySelectorAll("div > label > b");
                    for (let i = 0; i < labels.length; i++) {
                        const bold = labels.item(i);
                        const boldText = bold.textContent?.trim();
                        if ("Subject" == boldText) {
                            const parentDiv = bold.parentElement?.parentElement;
                            const span =
                                parentDiv?.querySelector("div > div> span");
                            subject = span?.textContent?.trim();
                        }
                    }
                }
                if (!subject) {
                    const h2Element: HTMLElement | null =
                        doc.querySelector("#short-desc");
                    if (h2Element) {
                        subject = h2Element.textContent;
                    }
                }
                if (subject) {
                    linkText += `: ${subject.trim()}`;
                }
            }
            const result: Link = {
                text: linkText,
                destination: url,
            };
            return result;
        } else {
            // Does it look like a ServiceNow page?
            const divElement: HTMLElement | null = doc.querySelector(
                "body div.sp-page-root"
            );
            if (divElement) {
                const ticketNumberHeading: HTMLHeadingElement | null =
                    divElement.querySelector("h2.ticket-number");
                const ticketDescParagraph: HTMLParagraphElement | null =
                    divElement.querySelector("p.ticket-desc");
                if (ticketNumberHeading && ticketDescParagraph) {
                    const ticketNumber = ticketNumberHeading.textContent;
                    const ticketDesc = ticketDescParagraph.textContent;
                    const linkText = `${ticketNumber}: ${ticketDesc}`;
                    const result: Link = {
                        text: linkText,
                        destination: url,
                    };
                    return result;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }
}
