export class KeyboardShortcut {
    static asString(
        ctrl: boolean,
        alt: boolean,
        shift: boolean,
        key: string
    ): string {
        var result = "";
        result += key;
        return result;
    }
}
