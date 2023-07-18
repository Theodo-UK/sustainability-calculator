import { formatBytes } from "../formatNumbersToString";

describe("formatBytesString", () => {
    it("format as bytes", () => {
        expect(formatBytes(536)).toBe("536 B");
    });
    it("format bytes as kilobytes", () => {
        expect(formatBytes(2403)).toBe("2.40 KB");
    });
    it("format kilobytes as megabytes", () => {
        expect(formatBytes(460329184)).toBe("460.33 MB");
    });
    it("format megabytes as gigabytes", () => {
        expect(formatBytes(9182374619)).toBe("9.18 GB");
    });
    it("format gigabytes as terabytes", () => {
        expect(formatBytes(6281674923124)).toBe("6.28 TB");
    });
});
describe("formatBytes edge cases", () => {
    it("format as bytes", () => {
        expect(formatBytes(999)).toBe("999 B");
    });
    it("format bytes as kilobytes", () => {
        expect(formatBytes(9999)).toBe("10.00 KB");
    });
    it("format kilobytes as megabytes", () => {
        expect(formatBytes(999999)).toBe("1.00 MB");
    });
    it("format megabytes as gigabytes", () => {
        expect(formatBytes(999999999)).toBe("1.00 GB");
    });
    it("format gigabytes as terabytes", () => {
        expect(formatBytes(999999999999)).toBe("1.00 TB");
    });
});
