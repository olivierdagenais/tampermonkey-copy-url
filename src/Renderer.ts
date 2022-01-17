import { Clipboard } from "./Clipboard";
import { Link } from "./Link";

// a Renderer is something that takes a Link instance and creates a Clipboard instance
export interface Renderer {
    render(link: Link): Clipboard;
}
