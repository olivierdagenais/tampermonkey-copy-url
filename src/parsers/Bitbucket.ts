import { AbstractParser } from "./AbstractParser";
import { Link } from "../Link";

const bbUrlRegex =
    /https?:\/\/(?<host>[^/]+)\/([^/]+\/)*(?<projectsOrUsers>projects|users)\/(?<project>[^/]+)\/repos\/(?<repo>[^/]+)\/(?<rest>.+)/;
const browseUrlRegex =
    /browse(\/(?<path>[^?#]+)?(\?at=(?<ref>[^#]+))?(#(?<lines>[0-9,-]+))?)?/;
const commitIdRegex = /([a-f0-9]{40})/;
const commitListUrlRegex = /commits\?until=(?<ref>[^&]+)(&.+)?/;
const deepCommitUrlRegex =
    /commits\/(?<ref>[^#]+)(#(?<path>[^?]+)(\?[ft]=(?<lineNumber>\d+))?)?/;
const prUrlRegex = /pull-requests\/(?<prId>\d+)(\/(?<extra>.*))?/;
const prExtraRegex =
    /commits\/(?<ref>[^#]+)(#(?<path>[^?]+)(\?[ft]=(?<lineNumber>\d+))?)?/;

export class Bitbucket extends AbstractParser {
    parseLink(doc: Document, url: string): Link | null {
        const bbUrlMatch = url.match(bbUrlRegex);
        if (!bbUrlMatch || !bbUrlMatch.groups) {
            return null;
        }
        const bbUrlGroups = bbUrlMatch.groups;
        const projectsOrUsers = bbUrlGroups.projectsOrUsers;
        const project =
            (projectsOrUsers === "users" ? "~" : "") + bbUrlGroups.project;
        const repo = bbUrlGroups.repo;
        const rest = bbUrlGroups.rest;

        const browseUrlMatch = rest.match(browseUrlRegex);
        if (browseUrlMatch && browseUrlMatch.groups) {
            const browseUrlGroups = browseUrlMatch.groups;
            return this.parseBrowseUrl(
                doc,
                url,
                project,
                repo,
                browseUrlGroups
            );
        }
        const prUrlMatch = rest.match(prUrlRegex);
        if (prUrlMatch && prUrlMatch.groups) {
            const prUrlGroups = prUrlMatch.groups;
            return this.parsePullRequest(doc, url, project, repo, prUrlGroups);
        }
        const commitListUrlMatch = rest.match(commitListUrlRegex);
        if (commitListUrlMatch && commitListUrlMatch.groups) {
            const commitListUrlGroups = commitListUrlMatch.groups;
            return this.parseCommitList(
                url,
                project,
                repo,
                commitListUrlGroups
            );
        }
        const deepCommitUrlMatch = rest.match(deepCommitUrlRegex);
        if (deepCommitUrlMatch && deepCommitUrlMatch.groups) {
            const deepCommitUrlGroups = deepCommitUrlMatch.groups;
            return this.parseDeepCommit(
                url,
                project,
                repo,
                deepCommitUrlGroups
            );
        }
        return null;
    }

    getPrettyRef(
        stringOrMatchGroups: string | { [key: string]: string }
    ): string {
        const ref: string =
            typeof stringOrMatchGroups === "string"
                ? stringOrMatchGroups
                : stringOrMatchGroups.ref;
        if (ref.indexOf("%") > -1) {
            return decodeURIComponent(ref);
        }
        const commitIdMatch = ref.match(commitIdRegex);
        if (commitIdMatch) {
            return ref.substring(0, 10);
        }
        return ref;
    }

    private countLines(input: string): string {
        var result = "line";
        if (input.indexOf("-") > -1 || input.indexOf(",") > -1) {
            result += "s";
        }
        return result;
    }

    private parseBrowseUrl(
        doc: Document,
        url: string,
        project: string,
        repo: string,
        browseUrlGroups: { [key: string]: string }
    ): Link | null {
        var prefix = "";
        if (browseUrlGroups.lines) {
            const lines = browseUrlGroups.lines;
            const countLines = this.countLines(lines);
            prefix += `${countLines} ${lines} of `;
        }
        if (browseUrlGroups.path) {
            prefix += `${browseUrlGroups.path} at `;
        }
        if (browseUrlGroups.ref) {
            const ref = this.getPrettyRef(browseUrlGroups);
            prefix += `commit ${ref} in `;
        } else {
            const anchorElement = doc.querySelector(
                "html > body section#content a[data-commitid]"
            );
            if (anchorElement) {
                const rawRef = anchorElement.getAttribute("data-commitid");
                if (rawRef) {
                    const ref = this.getPrettyRef(rawRef);
                    prefix += `commit ${ref} in `;
                    // now we need to insert at=${rawUrl} in the original URL's query string
                    const parsedUrl = new URL(url);
                    parsedUrl.searchParams.set("at", rawRef);
                    url = parsedUrl.toString();
                }
            }
        }

        const linkText = `${prefix}${project}/${repo}`;
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }

    private parseCommitList(
        url: string,
        project: string,
        repo: string,
        commitListUrlGroups: { [key: string]: string }
    ): Link | null {
        const ref = this.getPrettyRef(commitListUrlGroups);
        const linkText = `commits at ${ref} in ${project}/${repo}`;
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }

    private parseDeepCommit(
        url: string,
        project: string,
        repo: string,
        deepCommitUrlGroups: { [key: string]: string }
    ) {
        var prefix = "";
        const path = deepCommitUrlGroups.path;
        if (path) {
            const lineNumber = deepCommitUrlGroups.lineNumber;
            if (lineNumber) {
                prefix += `line ${lineNumber} of `;
            }
            const decodedPath = decodeURIComponent(path);
            prefix += `${decodedPath} at `;
        }
        const ref = this.getPrettyRef(deepCommitUrlGroups);
        prefix += `commit ${ref} in `;
        const linkText = `${prefix}${project}/${repo}`;
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }

    private parsePullRequest(
        doc: Document,
        url: string,
        project: string,
        repo: string,
        prUrlGroups: { [key: string]: string }
    ): Link | null {
        const prId = prUrlGroups.prId;
        const extra = prUrlGroups.extra;

        const h2Selectors = [
            "html > body h2.pull-request-title",
            "html > body span.pull-request-title > h2",
        ];
        const h2Element = doc.querySelector(h2Selectors.join(", "));
        if (!h2Element) {
            return null;
        }
        const summary = h2Element.textContent;
        var prefix = "";
        if (extra) {
            const prExtraMatch = extra.match(prExtraRegex);
            if (prExtraMatch && prExtraMatch.groups) {
                const prExtraGroups = prExtraMatch.groups;
                const path = prExtraGroups.path;
                if (path) {
                    const lineNumber = prExtraGroups.lineNumber;
                    if (lineNumber) {
                        prefix += `line ${lineNumber} of `;
                    }
                    const decodedPath = decodeURIComponent(path);
                    prefix += `${decodedPath} at `;
                }
                const ref = this.getPrettyRef(prExtraGroups);
                prefix += `commit ${ref} in `;
            }
        }

        const linkText = `${prefix}${project}/${repo}#${prId}: ${summary}`;
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
