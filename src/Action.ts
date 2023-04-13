export interface Action {
    perform(doc: Document, url: string, e : KeyboardEvent): Promise<boolean>;
}
