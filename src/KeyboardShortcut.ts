export class KeyboardShortcut {
    static asString(
        ctrl: boolean,
        alt: boolean,
        shift: boolean,
        key: string
    ): string {
        var result = "";
        if (ctrl) {
            result += "Ctrl+";
        }
        if (alt) {
            result += "Alt+";
        }
        if (shift) {
            result += "Shift+";
        }
        result += key;
        return result;
    }
}
