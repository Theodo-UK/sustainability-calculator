import { formatBytesString } from "../formatBytesString";

describe("formatBytesString", () => {
    it("format as bytes", () => {
        expect(formatBytesString(536)).toBe("536 B");
    });
    it("format bytes as kilobytes", () => {
        expect(formatBytesString(2403)).toBe("2.40 KB");
    });
    it("format kilobytes as megabytes", () => {
        expect(formatBytesString(460329184)).toBe("460.33 MB");
    });
    it("format megabytes as gigabytes", () => {
        expect(formatBytesString(9182374619)).toBe("9.18 GB");
    });
    it("format gigabytes as terabytes", () => {
        expect(formatBytesString(6281674923124)).toBe("6.28 TB");
    });
});
describe("formatBytesString edge cases", () => {
    it("format as bytes", () => {
        expect(formatBytesString(999)).toBe("999 B");
    });
    it("format bytes as kilobytes", () => {
        expect(formatBytesString(9999)).toBe("10.00 KB");
    });
    it("format kilobytes as megabytes", () => {
        expect(formatBytesString(999999)).toBe("1.00 MB");
    });
    it("format megabytes as gigabytes", () => {
        expect(formatBytesString(999999999)).toBe("1.00 GB");
    });
    it("format gigabytes as terabytes", () => {
        expect(formatBytesString(999999999999)).toBe("1.00 TB");
    });
});
