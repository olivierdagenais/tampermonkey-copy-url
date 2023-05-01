import { Action } from "../Action";

export class JiraSave implements Action {
    async perform(
        doc: Document,
        url: string,
        e: KeyboardEvent
    ): Promise<boolean> {
        const form: HTMLFormElement | null = this.findSaveableForm(doc, url);
        if (form) {
            form.submit();
            return true;
        }
        return false;
    }

    findSaveableForm(doc: Document, url: string): HTMLFormElement | null {
        const body: HTMLBodyElement | null = doc.querySelector("body#jira");
        if (!body) {
            return null;
        }

        const form: HTMLFormElement | null =
            doc.querySelector("form#issue-create");
        return form;
    }
}
