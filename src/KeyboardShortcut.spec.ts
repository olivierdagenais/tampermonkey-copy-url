import { assert, test } from "vitest";
import { KeyboardShortcut } from "./KeyboardShortcut";

test("letter only", () => {
    const actual = KeyboardShortcut.asString(false, false, false, "f");

    assert.equal(actual, "f");
});

test("control + f", () => {
    const actual = KeyboardShortcut.asString(true, false, false, "f");

    assert.equal(actual, "Ctrl+f");
});

test("alt + f", () => {
    const actual = KeyboardShortcut.asString(false, true, false, "f");

    assert.equal(actual, "Alt+f");
});

test("shift + f", () => {
    const actual = KeyboardShortcut.asString(false, false, true, "f");

    assert.equal(actual, "Shift+f");
});

test("ctrl + alt + shift + f", () => {
    const actual = KeyboardShortcut.asString(true, true, true, "f");

    assert.equal(actual, "Ctrl+Alt+Shift+f");
});
