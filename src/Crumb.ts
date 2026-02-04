
export class Crumb {
    readonly name: string | null;
    readonly href: string;

    constructor(
        name: string | null,
        href: string
    ) {
        this.name = name;
        this.href = href;
    }

}
