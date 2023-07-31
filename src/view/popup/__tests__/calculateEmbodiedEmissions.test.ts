import { CountryName } from "../../../data/constants/CountryEmissions";
import { calculateEmbodiedEmissions } from "../utils/calculateEmbodiedEmissions";

const mockDevice: Map<CountryName, number> = new Map([["iPhone 11", 1]]);

const mockDevices: Map<CountryName, number> = new Map([
    ["iPhone 11", 0.2],
    ["iPhone 7", 0.2],
    ["Google Pixel 5", 0.4],
]);

describe("calculateCarbon", () => {
    it("country should return corresponding value", () => {
        expect(calculateEmbodiedEmissions(100, mockDevice)).toBeCloseTo(
            0.057038558
        );
    });

    it("multiple countries should return corresponding carbon consumption for a given transfer size", () => {
        expect(calculateEmbodiedEmissions(100, mockDevices)).toBeCloseTo(
            0.06065546
        );
    });
});
