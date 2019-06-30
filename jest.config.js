module.exports = {
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        "vue"
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "^~/(.*)$": "<rootDir>/$1"
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.*\\.(vue)$": "vue-jest"
    },
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"
};
