import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

export class ServiceNow extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const ticketNumberSelectorList = [
            "#data\\.number\\.name",
            "h2.ticket-number",
        ];
        const ticketNumberSelector = ticketNumberSelectorList.join(", ");
        const ticketNumberElement = doc.querySelector(ticketNumberSelector);
        if (ticketNumberElement) {
            var linkText = ``;
            const ticketNumber = ticketNumberElement.textContent;
            if (ticketNumber) {
                linkText += ticketNumber.trim();

                var subject: string | undefined | null;
                const variablesToggle: HTMLElement | null =
                    doc.querySelector("#variables-toggle");
                if (variablesToggle) {
                    const bolds =
                        variablesToggle.querySelectorAll("div > label > b");
                    for (let i = 0; i < bolds.length; i++) {
                        const bold = bolds.item(i);
                        const boldText = bold.textContent?.trim();
                        if ("Subject" == boldText) {
                            const parentDiv = bold.parentElement?.parentElement;
                            const span =
                                parentDiv?.querySelector("div > div> span");
                            subject = span?.textContent?.trim();
                            break;
                        }
                    }
                }
                // only consider these as a last resort, because sometimes they
                // contain useless text and the real subject/summary was in the
                // "variables-toggle" element
                if (!subject) {
                    const subjectSelectorList = [
                        "#short-desc",
                        "p.ticket-desc",
                    ];
                    const subjectSelectors = subjectSelectorList.join(", ");
                    const subjectElement = doc.querySelector(subjectSelectors);
                    if (subjectElement) {
                        subject = subjectElement.textContent;
                    }
                }
                if (subject) {
                    linkText += `: ${subject.trim()}`;
                }

                const result: Link = {
                    text: linkText,
                    destination: url,
                };
                return result;
            }
        }
        return null;
    }
}
