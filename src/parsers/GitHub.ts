import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

export class GitHub extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        if (url.startsWith("https://github.com/")) {
            const titleContent = this.findTitle(doc);
            var titleString = titleContent ?? url;
            // TODO: implement special handling for PRs, issues, source code
            const blobUrlRegex =
                /https:\/\/github.com\/(?<userOrOrg>[^/]+)\/(?<repo>[^/]+)\/blob\/(?<refSpecAndPath>.+)/;
            const blobUrlMatch = url.match(blobUrlRegex);
            if (blobUrlMatch && blobUrlMatch.groups) {
                const blobUrlGroups = blobUrlMatch.groups;
                const refSpecAndPath = blobUrlGroups.refSpecAndPath;
                const blobTitleRegex =
                    /[^/]+\/(?<fileName>.+) at (?<refSpec>.+) · (?<userOrOrg>[^/]+)\/(?<repo>.+)/;
                const blobTitleMatch = titleString.match(blobTitleRegex);
                if (blobTitleMatch && blobTitleMatch.groups) {
                    const blobTitleGroups = blobTitleMatch.groups;
                    const refSpec = blobTitleGroups.refSpec;
                    const path = refSpecAndPath.substring(
                        refSpec.length + 1 /* the slash */
                    );
                    titleString = `${path} at ${refSpec} in ${blobUrlGroups.userOrOrg}/${blobUrlGroups.repo}`;
                }
            } else {
                const numberedUrlRegex =
                    /https:\/\/github.com\/(?<userOrOrg>[^/]+)\/(?<repo>[^/]+)\/(?:.+)\/(?<id>\d+)/;
                const numberedUrlMatch = url.match(numberedUrlRegex);
                if (numberedUrlMatch) {
                    const numberedTitleRegex =
                        /(?<title>.+) · (?:.+) #(?<id>\d+) · (?<userOrOrg>[^/]+)\/(?<repo>.+)/;
                    const numberedTitleMatch =
                        titleString.match(numberedTitleRegex);
                    if (numberedTitleMatch && numberedTitleMatch.groups) {
                        const groups = numberedTitleMatch.groups;
                        titleString = `${groups.userOrOrg}/${groups.repo}#${groups.id}: ${groups.title}`;
                    }
                }
            }
            const result: Link = {
                text: titleString,
                destination: url,
            };
            return result;
        }
        return null;
    }
}
