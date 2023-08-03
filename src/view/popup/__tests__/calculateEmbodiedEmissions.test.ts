import { DeviceName } from "../../../data/constants/DeviceEmissions";
import { calculateEmbodiedEmissions } from "../../../utils/emissions/calculateEmbodiedEmissions";

const mockDevice: Map<DeviceName, number> = new Map([["iPhone 11", 1]]);

const mockDevices: Map<DeviceName, number> = new Map([
    ["iPhone 11", 0.2],
    ["iPhone 7", 0.2],
    ["Google Pixel 5", 0.4],
]);

describe("calculateEmbodiedEmissions", () => {
    it("device should return corresponding value", () => {
        expect(calculateEmbodiedEmissions(100, mockDevice)).toBeCloseTo(
            0.057038558
        );
    });

    it("multiple devices should return corresponding carbon consumption for a given transfer size", () => {
        expect(calculateEmbodiedEmissions(100, mockDevices)).toBeCloseTo(
            0.06065546
        );
    });
});
