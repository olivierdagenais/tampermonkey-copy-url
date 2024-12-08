const semVerRegex =
    /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<preRelease>.+))?/;

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
        return (
            SemVer.compareTo(this.major, that.major) ||
            SemVer.compareTo(this.minor, that.minor)
        );
    }

    static parse(value: string): SemVer {
        const valueMatch = value.match(semVerRegex);
        if (!valueMatch || !valueMatch.groups) {
            throw new Error(`Can't parse ${value} as a valid SemVer`);
        }
        const valueGroups = valueMatch.groups;
        const major = Number.parseInt(valueGroups.major, 10);
        const minor = Number.parseInt(valueGroups.minor, 10);
        const patch = Number.parseInt(valueGroups.patch, 10);
        const preRelease = valueGroups.preRelease;

        return new SemVer(major, minor, patch, preRelease);
    }
}
