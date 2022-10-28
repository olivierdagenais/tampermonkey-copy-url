import { Link } from "../Link";
import { Parser } from "../Parser";

const commitUrlRegex =
    /https:\/\/(?<host>[^/]+)\/projects\/(?<project>[^/]+)\/repos\/(?<repo>[^/]+)\/commits\/(?<commitId>[a-f0-9]+)(#(?<path>[^?]+))?/;
const prUrlRegex =
    /https:\/\/(?<host>[^/]+)\/projects\/(?<project>[^/]+)\/repos\/(?<repo>[^/]+)\/pull-requests\/(?<prId>\d+)(\/(?<extra>.*))?/;

const prTitleRegex = /Pull Request #(?<prId>\d+): (?<summary>.+) - Stash/;
const prExtraRegex =
    /commits\/(?<commitId>[a-f0-9]+)(#(?<path>[^?]+)(\?f=(?<lineNumber>\d+))?)?/;

export class Bitbucket implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        const prUrlMatch = url.match(prUrlRegex);
        if (prUrlMatch && prUrlMatch.groups) {
            const prUrlGroups = prUrlMatch.groups;
            return this.parsePullRequest(doc, url, prUrlGroups);
        }
        const commitUrlMatch = url.match(commitUrlRegex);
        if (commitUrlMatch && commitUrlMatch.groups) {
            const commitUrlGroups = commitUrlMatch.groups;
            const project = commitUrlGroups.project;
            const repo = commitUrlGroups.repo;
            const commitId = commitUrlGroups.commitId.substring(0, 10);
            const path = commitUrlGroups.path;
            var prefix = "";
            if (path) {
                prefix += `${path} at `;
            }
            const linkText = `${prefix}commit ${commitId} in ${project}/${repo}`;
            const result: Link = {
                text: linkText,
                destination: url,
            };
            return result;
        }
        return null;
    }

    private parsePullRequest(
        doc: Document,
        url: string,
        prUrlGroups: { [key: string]: string }
    ): Link | null {
        const project = prUrlGroups.project;
        const repo = prUrlGroups.repo;
        const prId = prUrlGroups.prId;
        const extra = prUrlGroups.extra;

        const titleElement: HTMLElement | null =
            doc.querySelector("html head title");
        if (!titleElement) {
            return null;
        }
        const titleString = titleElement.textContent;
        const prTitleMatch = titleString?.match(prTitleRegex);
        if (!prTitleMatch || !prTitleMatch.groups) {
            return null;
        }
        const prTitleGroups = prTitleMatch.groups;
        const summary = prTitleGroups.summary;
        var prefix = "";
        if (extra) {
            const prExtraMatch = extra.match(prExtraRegex);
            if (prExtraMatch && prExtraMatch.groups) {
                const prExtraGroups = prExtraMatch.groups;
                if (prExtraGroups.lineNumber) {
                    prefix += `line ${prExtraGroups.lineNumber} of `;
                }
                if (prExtraGroups.path) {
                    prefix += `${prExtraGroups.path} at `;
                }
                const commitId = prExtraGroups.commitId.substring(0, 10);
                prefix += `commit ${commitId} in `;
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
