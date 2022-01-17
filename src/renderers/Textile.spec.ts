import assert from "assert";
import { Clipboard } from "../Clipboard";
import { Link } from "../Link";
import { Textile } from "./Textile";

test('should render a simple link', () => {
    let cut : Textile = new Textile();
    let link : Link = {
        text: "example",
        destination: "https://www.example.com",
    };

    let actual : Clipboard = cut.render(link);

    assert.equal(actual.data, '[example|https://www.example.com]');
})
