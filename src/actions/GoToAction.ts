export interface GoToAction {
    navigate(doc: Document, url: string): string | null;
}
