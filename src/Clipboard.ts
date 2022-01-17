// These are the details needed to invoke GM_setClipboard();
export type Clipboard = {
    data: string;
    // can be an object like "{ type: 'text', mimetype: 'text/plain'}"
    // or just a string expressing the type ("text" or "html").
    typeInfo: any;
}
