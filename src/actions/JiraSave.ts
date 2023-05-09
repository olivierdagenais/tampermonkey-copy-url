import { Action } from "../Action";

export class JiraSave implements Action {
    async perform(
        doc: Document,
        url: string,
        e: KeyboardEvent
    ): Promise<boolean> {
        const button: HTMLInputElement | null = this.findSaveButton(doc, url);
        if (button) {
            button.click();
            return true;
        }
        return false;
    }

    findSaveButton(doc: Document, url: string): HTMLInputElement | null {
        const body: HTMLBodyElement | null = doc.querySelector("body#jira");
        if (!body) {
            return null;
        }

        const button: HTMLInputElement | null = doc.querySelector(
            "input#issue-create-submit, input#edit-issue-submit"
        );
        return button;
    }
}
