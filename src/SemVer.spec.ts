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

test("compare when equal", () => {
    const x = new SemVer(1, 2, 3);
    const y = new SemVer(1, 2, 3);

    assert.equal(x.compareTo(y), 0);
    assert.equal(y.compareTo(x), 0);
});

test("compare with larger major", () => {
    const x = new SemVer(1, 2, 3);
    const y = new SemVer(2, 2, 3);

    assert.equal(x.compareTo(y), -1);
    assert.equal(y.compareTo(x), 1);
});

test("compare with larger minor", () => {
    const x = new SemVer(1, 2, 3);
    const y = new SemVer(1, 3, 3);

    assert.equal(x.compareTo(y), -1);
    assert.equal(y.compareTo(x), 1);
});

test("parse with invalid value", () => {
    const input = "invalid";

    assert.throw(() => SemVer.parse(input));
});

test("parse with MAJOR.MINOR.PATCH", () => {
    const input = "1.2.3";

    const actual = SemVer.parse(input);

    assert.equal(actual.major, 1);
    assert.equal(actual.minor, 2);
    assert.equal(actual.patch, 3);
});

test("parse with MAJOR.MINOR.PATCH-PRERELEASE", () => {
    const input = "1.2.3-SNAPSHOT";

    const actual = SemVer.parse(input);

    assert.equal(actual.major, 1);
    assert.equal(actual.minor, 2);
    assert.equal(actual.patch, 3);
    assert.equal(actual.preRelease, "SNAPSHOT");
});
