import { act, renderHook } from "@testing-library/react";
import { CountryName } from "../../../../data/constants/CountryEmissions";
import { areMapsDeepEqual } from "../../../../utils/helpers/areMapsDeepEqual";
import { useSelectedCountriesContext } from "../useSelectedCountriesContext";

describe("usePopup tests for selectedCountries", () => {
    const mockCountries: Map<CountryName, number> = new Map([]);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("addSelectedCountry should update selectedCountries", async () => {
        const { result } = renderHook(useSelectedCountriesContext);
        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";

        mockCountries.set(mockCountry1, 0);
        await act(async () => {
            await result.current.addSelectedCountry(mockCountry1);
        });
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);

        mockCountries.set(mockCountry2, 0);
        await act(async () => {
            await result.current.addSelectedCountry(mockCountry2);
        });
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);
    });

    it("removeSelectedCountries should update selectedCountries", async () => {
        const { result } = renderHook(useSelectedCountriesContext);

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";

        mockCountries.set(mockCountry1, 0);
        mockCountries.set(mockCountry2, 0);

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry1);
        });

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry2);
        });

        expect(
            areMapsDeepEqual(result.current.selectedCountries, mockCountries)
        ).toBe(true);

        mockCountries.delete(mockCountry2);

        await act(async () => {
            await result.current.removeSelectedCountry(mockCountry2);
        });

        expect(
            areMapsDeepEqual(result.current.selectedCountries, mockCountries)
        ).toBe(true);
    });

    it("validatePercentages should throw an error if the sum of percentages is greater than 100%", () => {
        const { result } = renderHook(useSelectedCountriesContext);

        result.current.selectedCountries.set("Australia", 0.5);
        result.current.selectedCountries.set("United Kingdom", 0.6);

        expect(() => result.current.validatePercentages()).toThrowError(
            "Error: The sum of the percentages is greater than 100%. Current sum: 110%"
        );
    });
});
