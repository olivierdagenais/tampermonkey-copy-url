// Inspired from https://dev.to/muhajirdev/unit-testing-with-typescript-and-jest-2gln
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "ts-jest",
    testEnvironment: "node",
};
