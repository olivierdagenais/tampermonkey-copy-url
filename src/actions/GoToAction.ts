import { Action } from "../Action";

export abstract class GoToAction implements Action {
    perform(doc: Document, url: string): boolean {
        const result: string | null = this.navigate(doc, url);
        if (result) {
            window.location.href = result;
            return true;
        }
        return false;
    }
    abstract navigate(doc: Document, url: string): string | null;
}
