import { Link } from "../Link";
import { Parser } from "../Parser";

const bbUrlRegex =
    /https:\/\/(?<host>[^/]+)\/projects\/(?<project>[^/]+)\/repos\/(?<repo>[^/]+)\/(?<rest>.+)/;
const commitUrlRegex = /commits\/(?<commitId>[a-f0-9]+)(#(?<path>[^?]+))?/;
const prUrlRegex = /pull-requests\/(?<prId>\d+)(\/(?<extra>.*))?/;

const prTitleRegex = /Pull Request #(?<prId>\d+): (?<summary>.+) - Stash/;
const prExtraRegex =
    /commits\/(?<commitId>[a-f0-9]+)(#(?<path>[^?]+)(\?f=(?<lineNumber>\d+))?)?/;

export class Bitbucket implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        const bbUrlMatch = url.match(bbUrlRegex);
        if (!bbUrlMatch || !bbUrlMatch.groups) {
            return null;
        }
        const bbUrlGroups = bbUrlMatch.groups;
        const project = bbUrlGroups.project;
        const repo = bbUrlGroups.repo;
        const rest = bbUrlGroups.rest;
        const prUrlMatch = rest.match(prUrlRegex);
        if (prUrlMatch && prUrlMatch.groups) {
            const prUrlGroups = prUrlMatch.groups;
            return this.parsePullRequest(doc, url, project, repo, prUrlGroups);
        }
        const commitUrlMatch = rest.match(commitUrlRegex);
        if (commitUrlMatch && commitUrlMatch.groups) {
            const commitUrlGroups = commitUrlMatch.groups;
            const commitId = this.getCommitId(commitUrlGroups);
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

    private getCommitId(matchGroups: { [key: string]: string }): string {
        return matchGroups.commitId.substring(0, 10);
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
                const commitId = this.getCommitId(prExtraGroups);
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
