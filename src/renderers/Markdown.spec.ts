import assert from "assert";
import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Markdown } from "./Markdown";

test('should render a simple link', () => {
    let cut : Markdown = new Markdown();
    let link : Link = {
        text: "example",
        destination: "https://www.example.com",
    };

    let actual : Clipboard = cut.render(link);

    assert.equal(actual.data, "[example](https://www.example.com)");
})
