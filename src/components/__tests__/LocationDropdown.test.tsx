import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { CountryDropdown } from "components/CountryDropdown";


describe('CountryDropdown', () => {
    it('calls setSelectedCountry with the correct country', () => {
        const selectedCountry = "United Kingdom"
        const setSelectedCountry = jest.fn();
        const { getByText } = render(
            <CountryDropdown selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        );

        fireEvent.click(getByText('United Kingdom'));
        fireEvent.click(getByText('Austria'));


        expect(setSelectedCountry).toHaveBeenCalledWith("Austria");
    });
}
)