import { Link } from "../Link";
import { Parser } from "../Parser";

export class Bitbucket implements Parser {
    parseLink(doc: Document, url: string): Link | null {
        const prUrlRegex =
            /https:\/\/(?<host>[^/]+)\/projects\/(?<project>[^/]+)\/repos\/(?<repo>[^/]+)\/pull-requests\/(?<prId>\d+).*/;
        const prUrlMatch = url.match(prUrlRegex);
        if (!prUrlMatch || !prUrlMatch.groups) {
            return null;
        }
        const prUrlGroups = prUrlMatch.groups;
        const project = prUrlGroups.project;
        const repo = prUrlGroups.repo;
        const prId = prUrlGroups.prId;

        const titleElement: HTMLElement | null =
            doc.querySelector("html head title");
        if (!titleElement) {
            return null;
        }
        const titleString = titleElement.textContent;
        const prTitleRegex =
            /Pull Request #(?<prId>\d+): (?<summary>.+) - Stash/;
        const prTitleMatch = titleString?.match(prTitleRegex);
        if (!prTitleMatch || !prTitleMatch.groups) {
            return null;
        }
        const prTitleGroups = prTitleMatch.groups;
        const summary = prTitleGroups.summary;

        const linkText = `${project}/${repo}#${prId}: ${summary}`;
        const result: Link = {
            text: linkText,
            destination: url,
        };
        return result;
    }
}
