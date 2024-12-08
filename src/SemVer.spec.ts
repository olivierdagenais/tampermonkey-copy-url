import { assert, test } from "vitest";
import { SemVer } from "./SemVer";

test("construct with MAJOR.MINOR.PATCH", () => {
    const major = 1;
    const minor = 2;
    const patch = 3;

    const actual = new SemVer(major, minor, patch);

    assert.equal(actual.major, major);
    assert.equal(actual.minor, minor);
    assert.equal(actual.patch, patch);
});
