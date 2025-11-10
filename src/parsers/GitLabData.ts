export class GitLabData {

    description: string;
    page: string;
    projectFullPath: string;
    title: string;
    typeId: string;

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
        const titleSelectors = [
            "[data-testid='work-item-title']",
            "[data-testid='title-content']",
            "[data-testid='page-heading']",
        ];
        const titleSelector = titleSelectors.join(", ");
        const element = doc.querySelector(titleSelector);
        this.title
            = element?.textContent?.trim()
            ?? "(no title)";
        const rawTypeId
            = bodyElement?.getAttribute("data-page-type-id");
        const anchorElement = doc.querySelector(".router-link-exact-active");
        const fallbackTypeId = anchorElement?.textContent?.trim();
        let typeId: string = "(no type ID)";
        switch (this.page) {
            case "projects:issues:show":
                typeId = `#${rawTypeId}`;
                break;
            case "projects:merge_requests:show":
                typeId = `!${rawTypeId}`;
                break;
            case "projects:issues:new":
            case "projects:work_items:show":
                typeId = `${fallbackTypeId}`;
                break;
        }
        this.typeId = typeId;
    }

}
