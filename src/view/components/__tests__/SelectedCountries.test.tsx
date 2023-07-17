import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectedCountries } from "../selected-countries/SelectedCountries";
import { CountryName } from "data/constants/CountryEmissions";

describe("SelectedCountries", () => {
    it("should display a title", () => {
        const selectedCountries = jest.mocked<Map<CountryName, number>>(
            new Map()
        );
        const removeSelectedCountry = jest.fn();
        const setCountryPercentage = jest.fn();
        const { getByText } = render(
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
        );

        expect(getByText("My users are based in...")).toBeInTheDocument();
    });
    it("should see a caption mentionning a country when one has been selected", () => {
        const selectedCountries = new Map([["United Kingdom", 0.2]]);
        const removeSelectedCountry = jest.fn();
        const setCountryPercentage = jest.fn();
        const { getByText } = render(
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
        );

        expect(getByText("United Kingdom (% users):")).toBeInTheDocument();
    });
    it("should update the percentage of users in a country when calling setCountryPercentage", () => {
        // Arrange
        const initPercentage = 0.2;
        const selectedCountries = new Map([["UnitedKingdom", initPercentage]]);
        const removeSelectedCountry = jest.fn();
        const setCountryPercentage = jest.fn();
        const { getByDisplayValue } = render(
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
        );

        // Act
        const countryInput = getByDisplayValue(initPercentage * 100);
        fireEvent.change(countryInput, { target: { value: "40" } });

        // Assert
        expect(setCountryPercentage).toHaveBeenCalledWith("UnitedKingdom", 0.4);
    });
    it("should remove a country when clicking on the remove button", () => {
        // Arrange
        const selectedCountries = new Map([["UnitedKingdom", 0.2]]);
        const removeSelectedCountry = jest.fn();
        const setCountryPercentage = jest.fn();
        const { getByText } = render(
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
        );

        // Act
        const removeButton = getByText("-");
        fireEvent.click(removeButton);

        // Assert
        expect(removeSelectedCountry).toHaveBeenCalledWith("UnitedKingdom");
    });
});