import { CountryName } from "../../../data/constants/CountryEmissions";
import { calculateCarbon } from "../utils/calculateCarbon";

const mockCountry: Map<CountryName, number> = new Map([["Australia", 50]]);

const mockCountries: Map<CountryName, number> = new Map([
    ["Australia", 20],
    ["United Kingdom", 30],
    ["Belgium", 20],
    ["Bulgaria", 20],
    ["Croatia", 10],
]);

const mockSmallBytes = 50;
const mockLargeBytes = 500000;

describe("calculateCarbon", () => {
    it("country should return corresponding value", () => {
        expect(calculateCarbon(mockSmallBytes, mockCountry)).toBeCloseTo(
            0.000017695
        );
    });

    it("multiple countries should return corresponding carbon consumption for a given transfer size", () => {
        expect(calculateCarbon(mockLargeBytes, mockCountries)).toBeCloseTo(
            0.16074
        );
    });
});
