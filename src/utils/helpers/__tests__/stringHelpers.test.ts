import { removeWhiteSpace } from "../stringHelpers";

describe("removeWhiteSpace function", () => {
    it("should remove all whitespace characters from a string", () => {
        const input = "  Hello   world!  ";
        const expectedOutput = "Helloworld!";
        const actualOutput = removeWhiteSpace(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    it("should return an empty string if the input is an empty string", () => {
        const input = "";
        const expectedOutput = "";
        const actualOutput = removeWhiteSpace(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    it("should return the input string if it contains no whitespace characters", () => {
        const input = "Hello";
        const expectedOutput = "Hello";
        const actualOutput = removeWhiteSpace(input);
        expect(actualOutput).toEqual(expectedOutput);
    });
});
