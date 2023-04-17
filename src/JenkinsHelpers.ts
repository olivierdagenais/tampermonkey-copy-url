export class JenkinsHelpers {
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
