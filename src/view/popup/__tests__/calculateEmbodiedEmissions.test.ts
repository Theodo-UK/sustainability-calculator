import { DeviceName } from "../../../data/constants/DeviceEmissions";
import { calculateEmbodiedEmissions } from "../utils/calculateEmbodiedEmissions";

const mockDevice: Map<DeviceName, number> = new Map([["iPhone 11", 100]]);

const mockDevices: Map<DeviceName, number> = new Map([
    ["iPhone 11", 20],
    ["iPhone 7", 20],
    ["Google Pixel 5", 40],
]);

describe("calculateEmbodiedEmissions", () => {
    it("device should return corresponding value", () => {
        expect(calculateEmbodiedEmissions(100, mockDevice)).toBeCloseTo(
            5.7038558
        );
    });

    it("multiple devices should return corresponding carbon consumption for a given transfer size", () => {
        expect(calculateEmbodiedEmissions(100, mockDevices)).toBeCloseTo(
            6.065546
        );
    });
});
