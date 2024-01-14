import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

export class Zabbix extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const footerElement: HTMLElement | null = doc.querySelector(
            "html > body footer[role]"
        );
        if (!footerElement) {
            return null;
        }

        const titleElement: HTMLElement | null = doc.querySelector(
            "h1#page-title-general"
        );
        if (!titleElement || !titleElement.textContent) {
            return null;
        }
        var linkText = titleElement.textContent.trim();
        const formElement: HTMLFormElement | null = doc.querySelector(
            "html > body form[name=zbx_filter]"
        );
        if (formElement) {
            // now we need to insert from & to values in the original URL's query string
            const parsedUrl = new URL(url);
            const fromInputElement: HTMLInputElement | null =
                doc.querySelector("input#from");
            if (fromInputElement) {
                const from: string | null =
                    fromInputElement.getAttribute("value");
                if (from) {
                    parsedUrl.searchParams.set("from", from);
                }
            }
            const toInputElement: HTMLInputElement | null =
                doc.querySelector("input#to");
            if (toInputElement) {
                const to: string | null = toInputElement.getAttribute("value");
                if (to) {
                    parsedUrl.searchParams.set("to", to);
                }
            }
            url = parsedUrl.toString();
        }
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
