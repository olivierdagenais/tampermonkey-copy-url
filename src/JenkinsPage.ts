import {Crumb} from "./Crumb";
import {JenkinsHelpers} from "./JenkinsHelpers";

export class JenkinsPage {
    readonly urlString: string;
    readonly urlParts: string[];
    readonly crumbs: Crumb[];

    constructor(
        urlString: string,
        crumbs: Crumb[],
    ) {
        this.urlString = urlString;
        this.urlParts = JenkinsHelpers.splitUrlPath(urlString);
        this.crumbs = crumbs;
    }

}
