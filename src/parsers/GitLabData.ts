export class GitLabData {

    description: string;
    page: string;
    projectFullPath: string;

    constructor(doc: Document) {
        const descriptionSelector =
            "html head meta[property='og:description']";
        const descriptionElement: HTMLElement | null =
            doc.querySelector(descriptionSelector);
        const description = descriptionElement?.getAttribute("content");
        const bodySelector = "html body";
        const bodyElement = doc.querySelector(bodySelector);
        this.description
            = description
            ?? "(no description)";
        this.page
            = bodyElement?.getAttribute("data-page")
            ?? "(no page)";
        this.projectFullPath
            = bodyElement?.getAttribute("data-project-full-path")
            ?? "(no path)";
    }

}
