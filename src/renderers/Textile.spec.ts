import assert from "assert";
import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Textile } from "./Textile";

test("should render a simple link", () => {
    const cut: Textile = new Textile();
    const link: Link = {
        text: "example",
        destination: "https://www.example.com",
    };

    const actual: Clipboard = cut.render(link);

    assert.equal(actual.text, "[example|https://www.example.com]");
});
