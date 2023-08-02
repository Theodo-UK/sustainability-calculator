import { secondsToTimeString } from "../stringHelpers";

describe("secondsToTimeString", () => {
    it("should return '00:00' for 0 seconds", () => {
        expect(secondsToTimeString(0)).toBe("00:00");
    });

    it("should return '00:01' for 1 second", () => {
        expect(secondsToTimeString(1)).toBe("00:01");
    });

    it("should return '01:00' for 60 seconds", () => {
        expect(secondsToTimeString(60)).toBe("01:00");
    });

    it("should return '01:01' for 61 seconds", () => {
        expect(secondsToTimeString(61)).toBe("01:01");
    });

    it("should return '02:03' for 123 seconds", () => {
        expect(secondsToTimeString(123)).toBe("02:03");
    });
});
