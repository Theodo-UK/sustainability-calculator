import { formatBytesString } from "../formatBytesString";

describe("formatBytesString", () => {
    it("format as bytes", () => {
        expect(formatBytesString(999)).toBe("999 B");
    });
    it("format bytes as kilobytes", () => {
        expect(formatBytesString(9999)).toBe("10 KB"); // 9.999 KB
    });
    it("format kilobytes as megabytes", () => {
        expect(formatBytesString(999999)).toBe("1 MB");
    });
});
