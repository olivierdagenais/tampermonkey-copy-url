export interface Action {
    perform(doc: Document, url: string): Promise<boolean>;
}
