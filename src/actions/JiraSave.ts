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

        const saveButtonSelectors = [
            "input#create-issue-submit",
            "input#issue-create-submit",
            "input#edit-issue-submit",
            "input#issue-edit-submit",
            "input[name='edit-labels-submit']",
            "input[name='Link'][type='submit'].aui-button",
            "input#log-work-submit",
        ];
        const button: HTMLInputElement | null = doc.querySelector(
            saveButtonSelectors.join(", ")
        );
        return button;
    }
}
