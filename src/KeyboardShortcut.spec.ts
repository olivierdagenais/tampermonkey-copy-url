import { assert, test } from "vitest";
import { KeyboardShortcut } from "./KeyboardShortcut";

test("letter only", () => {
    const actual = KeyboardShortcut.asString(false, false, false, "f");

    assert.equal(actual, "f");
});
