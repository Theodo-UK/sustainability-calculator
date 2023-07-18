import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CountryDropdown } from "../country-dropdown/CountryDropdown";

describe("CountryDropdown", () => {
    it("Dropdown button should show add a country", () => {
        const addSelectedCountry = jest.fn();
        const { getByText } = render(
            <CountryDropdown addSelectedCountry={addSelectedCountry} />
        );

        expect(getByText("Add a country")).toBeInTheDocument();
    });
});
