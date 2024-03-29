import { assert, test } from "vitest";
import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Markdown } from "./Markdown";

test("should render a simple link", () => {
    const cut: Markdown = new Markdown();
    const link: Link = {
        text: "example",
        destination: "https://www.example.com",
    };

    const actual: Clipboard = cut.render(link);

    assert.equal(actual.text, "[example](https://www.example.com)");
});
