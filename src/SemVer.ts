const semVerRegex =
    /(?<major>\d+)\.(?<minor>\d+)(?:\.(?<patch>\d+)(?:-(?<preRelease>.+))?)?/;

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

    static asInteger(value: string): number {
        const maybeInt = Number.parseInt(value, 10);
        if (Number.isNaN(maybeInt)) {
            return 0;
        }
        return maybeInt;
    }

    static compareTo(x: number, y: number): number {
        if (x == y) {
            return 0;
        }
        if (x < y) {
            return -1;
        }
        return 1;
    }

    compareTo(that: SemVer): number {
        // TODO: this doesn't (yet) compare pre-releases
        return (
            SemVer.compareTo(this.major, that.major) ||
            SemVer.compareTo(this.minor, that.minor) ||
            SemVer.compareTo(this.patch, that.patch)
        );
    }

    static parse(value: string): SemVer {
        const valueMatch = value.match(semVerRegex);
        if (!valueMatch || !valueMatch.groups) {
            throw new Error(`Can't parse ${value} as a valid SemVer`);
        }
        const valueGroups = valueMatch.groups;
        const major = SemVer.asInteger(valueGroups.major);
        const minor = SemVer.asInteger(valueGroups.minor);
        const patch = SemVer.asInteger(valueGroups.patch);
        const preRelease = valueGroups.preRelease;

        return new SemVer(major, minor, patch, preRelease);
    }
}
