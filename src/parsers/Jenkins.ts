import { AbstractParser } from "./AbstractParser";
import { JenkinsHelpers } from "../JenkinsHelpers";
import { Link } from "../Link";
import { Crumb } from "../Crumb";

// Right-Pointing Double Angle Quotation Mark
const chevron = "\u00BB";

export class Jenkins extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const bodyElement = JenkinsHelpers.getBodyElement(doc);
        if (!bodyElement) {
            return null;
        }

        const jenkinsPage = JenkinsHelpers.parsePage(
            bodyElement,
            url
        );
        const urlParts = jenkinsPage.urlParts;
        const isUrlToRunConsole =
            "console" === urlParts[urlParts.length - 1] &&
            JenkinsHelpers.isInteger(urlParts[urlParts.length - 2]);
        let linkText = ``;
        jenkinsPage.eachCrumb((crumb: Crumb, key: number) => {
            if (key > 0) {
                let isUrlToRun = false;
                const href = crumb.href;
                const hrefParts = JenkinsHelpers.splitPath(href);
                const lastPart = hrefParts[hrefParts.length - 1];
                if (JenkinsHelpers.isInteger(lastPart)) {
                    isUrlToRun = !(
                        "node" === hrefParts[hrefParts.length - 2] &&
                        "execution" === hrefParts[hrefParts.length - 3]
                    );
                }
                if (key > 1) {
                    if (isUrlToRun) {
                        linkText += ` `;
                    }
                    else {
                        linkText += ` ${chevron} `;
                    }
                }
                linkText += crumb.name?.trim();
                if (key == jenkinsPage.crumbs.length - 1 && isUrlToRunConsole) {
                    linkText += ` ${chevron} Console Output`;
                }
            }
            return true;
        });

        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
