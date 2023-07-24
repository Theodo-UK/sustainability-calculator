import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { CountryDropdown } from "../countries/CountryDropdown";

describe("CountryDropdown", () => {
    it("should show add a country", () => {
        const addSelectedCountry = jest.fn();
        const selectCountries = new Map();
        const { getByPlaceholderText } = render(
            <CountryDropdown
                selectedCountries={selectCountries}
                addSelectedCountry={addSelectedCountry}
            />
        );

        expect(getByPlaceholderText("Add a country")).toBeInTheDocument();
    });
});
