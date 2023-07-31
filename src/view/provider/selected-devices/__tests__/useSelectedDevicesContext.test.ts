import { act, renderHook } from "@testing-library/react";
import { CountryName } from "../../../../data/constants/CountryEmissions";
import { areMapsDeepEqual } from "../../../../utils/helpers/areMapsDeepEqual";
import { useSelectedDevicesContext } from "../useSelectedDevicesContext";

describe("useSelectedDevicesContext", () => {
    const mockCountries: Map<CountryName, number> = new Map([]);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("addSelectedDevice should update selectedDevices", async () => {
        const { result } = renderHook(useSelectedDevicesContext);
        const mockDevice1 = "iPhone 12";
        const mockDevice2 = "Google Pixel 6";

        mockCountries.set(mockDevice1, 0);
        await act(async () => {
            await result.current.addSelectedDevice(mockDevice1);
        });
        expect(result.current.selectedDevices).toStrictEqual(mockCountries);

        mockCountries.set(mockDevice2, 0);
        await act(async () => {
            await result.current.addSelectedDevice(mockDevice2);
        });
        expect(result.current.selectedDevices).toStrictEqual(mockCountries);
    });

    it("removeSelectedCountries should update selectedDevices", async () => {
        const { result } = renderHook(useSelectedDevicesContext);

        const mockDevice1 = "iPhone 12";
        const mockDevice2 = "Google Pixel 6";

        mockCountries.set(mockDevice1, 0);
        mockCountries.set(mockDevice2, 0);

        await act(async () => {
            await result.current.addSelectedDevice(mockDevice1);
        });

        await act(async () => {
            await result.current.addSelectedDevice(mockDevice2);
        });

        expect(
            areMapsDeepEqual(result.current.selectedDevices, mockCountries)
        ).toBe(true);

        mockCountries.delete(mockDevice2);

        await act(async () => {
            await result.current.removeSelectedDevice(mockDevice2);
        });

        expect(
            areMapsDeepEqual(result.current.selectedDevices, mockCountries)
        ).toBe(true);
    });

    it("validatePercentages should throw an error if the sum of percentages is greater than 100%", () => {
        const { result } = renderHook(useSelectedDevicesContext);

        result.current.selectedDevices.set("iPhone 12", 0.5);
        result.current.selectedDevices.set("Google Pixel 6", 0.6);

        expect(() => result.current.validatePercentages()).toThrowError(
            "Error: The sum of the percentages is greater than 100%. Current sum: 110%"
        );
    });
});
