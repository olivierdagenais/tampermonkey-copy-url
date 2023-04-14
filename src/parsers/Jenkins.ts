import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

// Right-Pointing Double Angle Quotation Mark
const chevron = "\u00BB";
export class Jenkins extends AbstractParser {
    splitPath(path: string): string[] {
        const numToTrim = path.endsWith("/") ? 1 : 0;
        const adjustedPath = path.substring(0, path.length - numToTrim);
        const pathParts = adjustedPath.split("/");
        return pathParts;
    }

    isInteger(s: string): boolean {
        return Number.isInteger(Number.parseInt(s, 10));
    }

    parseLink(doc: Document, url: string): Link | null {
        const bodyElement: HTMLElement | null = doc.querySelector(
            "html body[id=jenkins]"
        );
        if (!bodyElement) {
            return null;
        }

        var selector = ".jenkins-breadcrumbs__list-item";
        const jenkinsVersion = bodyElement.getAttribute("data-version");
        switch (jenkinsVersion) {
            case "2.361.4":
                selector = ".jenkins-breadcrumbs .item";
                break;
        }
        var linkText = ``;
        const listItems: NodeListOf<HTMLElement> =
            doc.querySelectorAll(selector);
        listItems.forEach((value: HTMLElement, key: number) => {
            if (key > 0) {
                const anchor: HTMLAnchorElement | null =
                    value.querySelector("a");
                if (anchor) {
                    var isUrlToRun = false;
                    const href: string | null = anchor.getAttribute("href");
                    if (href) {
                        const hrefParts = this.splitPath(href);
                        const lastPart = hrefParts[hrefParts.length - 1];
                        if (this.isInteger(lastPart)) {
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
