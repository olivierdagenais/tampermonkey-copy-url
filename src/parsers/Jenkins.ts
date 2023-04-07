import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

// Right-Pointing Double Angle Quotation Mark
const chevron = "\u00BB";
export class Jenkins extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const bodyElement: HTMLElement | null = doc.querySelector(
            "html body[id=jenkins]"
        );
        if (!bodyElement) {
            return null;
        }

        var linkText = ``;
        const listItems: NodeListOf<HTMLElement> = doc.querySelectorAll(
            ".jenkins-breadcrumbs__list-item"
        );
        listItems.forEach((value: HTMLElement, key: number) => {
            if (key > 0) {
                const anchor: HTMLAnchorElement | null =
                    value.querySelector("a");
                if (anchor) {
                    var isUrlToRun = false;
                    const href: string | null = anchor.getAttribute("href");
                    if (href) {
                        const numToTrim = href.endsWith("/") ? 1 : 0;
                        const relativeUrl = href.substring(
                            0,
                            href.length - numToTrim
                        );
                        const hrefParts = relativeUrl.split("/");
                        const lastPart = hrefParts[hrefParts.length - 1];
                        if (Number.isInteger(Number.parseInt(lastPart, 10))) {
                            isUrlToRun = !(
                                "node" === hrefParts[hrefParts.length - 2] &&
                                "execution" === hrefParts[hrefParts.length - 3]
                            );
                        }
                    }
                    if (key > 1) {
                        if (isUrlToRun) {
                            linkText += ` `;
                        } else {
                            linkText += ` ${chevron} `;
                        }
                    }
                    linkText += anchor.text.trim();
                }
            }
        });

        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
