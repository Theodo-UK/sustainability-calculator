import { CountryName } from "../../../data/constants/CountryEmissions";
import { areMapsDeepEqual } from "../areMapsDeepEqual";

const mockMap1: Map<CountryName, number> = new Map([
    ["United Kingdom", 0],
    ["Australia", 10],
]);
const mockMap2: Map<CountryName, number> = new Map([
    ["United Kingdom", 0],
    ["Australia", 10],
]);
const mockMap3: Map<CountryName, number> = new Map([["United Kingdom", 0]]);
const mockMap4: Map<CountryName, number> = new Map([["United Kingdom", 10]]);
const mockMap5: Map<CountryName, number> = new Map([["Australia", 10]]);

describe("areMapsDeepEqual", () => {
    it("maps should be equal", () => {
        expect(areMapsDeepEqual(mockMap1, mockMap2)).toBe(true);
    });

    it("maps should not be equal when of different length", () => {
        expect(areMapsDeepEqual(mockMap1, mockMap3)).toBe(false);
    });

    it("maps should not be equal when there is a different value", () => {
        expect(areMapsDeepEqual(mockMap3, mockMap4)).toBe(false);
    });

    it("maps should not be equal when there is a different key", () => {
        expect(areMapsDeepEqual(mockMap4, mockMap5)).toBe(false);
    });
});
