export class SemVer {
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
    readonly preRelease?: string;

    constructor(
        major: number,
        minor: number,
        patch: number,
        preRelease?: string
    ) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.preRelease = preRelease;
    }

    static parse(value: string): SemVer {
        throw new Error(`Can't parse ${value} as a valid SemVer`);
    }
}
