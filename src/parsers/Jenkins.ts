import { AbstractParser } from "./AbstractParser";
import { JenkinsHelpers } from "../JenkinsHelpers";
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

    splitUrlPath(urlString: string): string[] {
        const url = new URL(urlString);
        return this.splitPath(url.pathname);
    }

    parseLink(doc: Document, url: string): Link | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const selector = JenkinsHelpers.getBreadcrumbItemSelector(bodyElement);
        const urlParts = this.splitUrlPath(url);
        const isUrlToRunConsole =
            "console" === urlParts[urlParts.length - 1] &&
            JenkinsHelpers.isInteger(urlParts[urlParts.length - 2]);
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
                        if (JenkinsHelpers.isInteger(lastPart)) {
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
                    if (key == listItems.length - 1 && isUrlToRunConsole) {
                        linkText += ` ${chevron} Console Output`;
                    }
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
