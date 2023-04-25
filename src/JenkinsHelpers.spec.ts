import { assert, test } from "vitest";
import { JenkinsHelpers } from "./JenkinsHelpers";

test("splitUrlPath with deep URL", () => {
    const input =
        "http://localhost:8080/job/Project/job/Repository/job/Branch/";

    const actual = JenkinsHelpers.splitUrlPath(input);

    assert.equal(actual.length, 7);
    assert.equal(actual[0], "");
    assert.equal(actual[1], "job");
    assert.equal(actual[2], "Project");
    assert.equal(actual[3], "job");
    assert.equal(actual[4], "Repository");
    assert.equal(actual[5], "job");
    assert.equal(actual[6], "Branch");
});
