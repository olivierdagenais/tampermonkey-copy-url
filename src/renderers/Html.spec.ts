import assert from "assert";
import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Html } from "./Html";

test('should render a simple link', () => {
    const cut : Html = new Html();
    const link : Link = {
        text: "example",
        destination: "https://www.example.com",
    };

    const actual : Clipboard = cut.render(link);

    assert.equal(actual.data, '<a href="https://www.example.com">example</a>');
})
