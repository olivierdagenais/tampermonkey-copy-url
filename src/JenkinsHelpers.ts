export class JenkinsHelpers {
    static getBodyElement(doc: Document) : HTMLElement | null {
        const bodyElement: HTMLElement | null = doc.querySelector(
            "html body[id=jenkins]"
        );
        return bodyElement;
    }

    static getBreadcrumbItemSelector(bodyElement: HTMLElement): string {
        var selector = ".jenkins-breadcrumbs__list-item";
        const jenkinsVersion = bodyElement.getAttribute("data-version");
        switch (jenkinsVersion) {
            case "2.361.4":
                selector = ".jenkins-breadcrumbs .item";
                break;
        }
        return selector;
    }
}
