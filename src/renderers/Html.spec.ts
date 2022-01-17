import assert from "assert";
import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Html } from "./Html";

test('should render a simple link', () => {
    let cut : Html = new Html();
    let link : Link = {
        text: "example",
        destination: "https://www.example.com",
    };

    let actual : Clipboard = cut.render(link);

    assert.equal('<a href="https://www.example.com">example</a>', actual.data);
})
