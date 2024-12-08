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

test("construct with MAJOR.MINOR.PATCH-PRE_RELEASE", () => {
    const major = 1;
    const minor = 2;
    const patch = 3;
    const preRelease = "SNAPSHOT";

    const actual = new SemVer(major, minor, patch, preRelease);

    assert.equal(actual.major, major);
    assert.equal(actual.minor, minor);
    assert.equal(actual.patch, patch);
    assert.equal(actual.preRelease, preRelease);
});
