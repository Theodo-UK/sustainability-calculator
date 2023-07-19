import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectedCountries } from "../selected-countries/SelectedCountries";
import { CountryName } from "data/constants/CountryEmissions";

describe("SelectedCountries", () => {
    let removeSelectedCountry: jest.Mock<(arg0: string) => void>;
    let setCountryPercentage: jest.Mock<(arg0: string, arg1: number) => void>;
    beforeEach(() => {
        jest.clearAllMocks();
        removeSelectedCountry = jest.fn();
        setCountryPercentage = jest.fn();
    });

    it("should display a title", () => {
        const selectedCountries = jest.mocked<Map<CountryName, number>>(
            new Map()
        );
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
        const initPercentage = 0.2;
        const selectedCountries = new Map([["UnitedKingdom", initPercentage]]);
        const { getByDisplayValue } = render(
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
        );

        const countryInput = getByDisplayValue(initPercentage * 100);
        fireEvent.change(countryInput, { target: { value: "40" } });

        expect(setCountryPercentage).toHaveBeenCalledWith("UnitedKingdom", 0.4);
    });
    it("should remove a country when clicking on the remove button", () => {
        const selectedCountries = new Map([["UnitedKingdom", 0.2]]);
        const { getByText } = render(
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
        );

        const removeButton = getByText("-");
        fireEvent.click(removeButton);

        expect(removeSelectedCountry).toHaveBeenCalledWith("UnitedKingdom");
    });
    describe("Percentage validity: ", () => {
        it("should display an error message when an individual percentage is above 100%", () => {
            const selectedCountries = new Map([["UnitedKingdom", 1.1]]);
            const { getByText } = render(
                <SelectedCountries
                    selectedCountries={selectedCountries}
                    removeSelectedCountry={removeSelectedCountry}
                    setCountryPercentage={setCountryPercentage}
                />
            );

            expect(
                getByText("Percentages must stay between 0% and 100%")
            ).toBeInTheDocument();
        });
        it("should display an error message when an individual percentage is below 0%", () => {
            const selectedCountries = new Map([["UnitedKingdom", -0.1]]);
            const { getByText } = render(
                <SelectedCountries
                    selectedCountries={selectedCountries}
                    removeSelectedCountry={removeSelectedCountry}
                    setCountryPercentage={setCountryPercentage}
                />
            );

            expect(
                getByText("Percentages must stay between 0% and 100%")
            ).toBeInTheDocument();
        });
        it("should display an error message when the sum of percentages is above 100%", () => {
            const selectedCountries = new Map([
                ["UnitedKingdom", 0.5],
                ["France", 0.6],
            ]);
            const { getByText } = render(
                <SelectedCountries
                    selectedCountries={selectedCountries}
                    removeSelectedCountry={removeSelectedCountry}
                    setCountryPercentage={setCountryPercentage}
                />
            );

            expect(
                getByText("Percentages must stay between 0% and 100%")
            ).toBeInTheDocument();
        });
        it("should not display an error message when all percentages are between 0% and 100%", () => {
            const selectedCountries = new Map([
                ["UnitedKingdom", 0.5],
                ["France", 0.4],
            ]);
            const { queryByText } = render(
                <SelectedCountries
                    selectedCountries={selectedCountries}
                    removeSelectedCountry={removeSelectedCountry}
                    setCountryPercentage={setCountryPercentage}
                />
            );

            expect(
                queryByText("Percentages must stay between 0% and 100%")
            ).not.toBeInTheDocument();
        });
    });
});
