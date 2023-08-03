import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { SelectedCountries } from "../countries/SelectedCountries";

describe("SelectedCountries", () => {
    let removeSelectedCountry: jest.Mock<(arg0: string) => void>;
    let setCountryPercentage: jest.Mock<(arg0: string, arg1: number) => void>;
    beforeEach(() => {
        jest.clearAllMocks();
        removeSelectedCountry = jest.fn();
        setCountryPercentage = jest.fn();
    });
    it("should see a caption mentionning a country when one has been selected", () => {
        const selectedCountries = new Map([["United Kingdom", 20]]);
        const { getByText } = render(
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
        );

        expect(getByText("% in United Kingdom")).toBeInTheDocument();
    });
    it("should update the percentage of users in a country when calling setCountryPercentage", () => {
        const initPercentage = 20;
        const selectedCountries = new Map([["UnitedKingdom", initPercentage]]);
        const { getByDisplayValue } = render(
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
        );

        const countryInput = getByDisplayValue(initPercentage);
        fireEvent.change(countryInput, { target: { value: "40" } });

        expect(setCountryPercentage).toHaveBeenCalledWith("UnitedKingdom", 40);
    });
    it("should remove a country when clicking on the remove button", () => {
        const selectedCountries = new Map([["UnitedKingdom", 20]]);
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
            const selectedCountries = new Map([["UnitedKingdom", 110]]);
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
            const selectedCountries = new Map([["UnitedKingdom", -10]]);
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
                ["UnitedKingdom", 50],
                ["France", 60],
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
                ["UnitedKingdom", 50],
                ["France", 40],
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
