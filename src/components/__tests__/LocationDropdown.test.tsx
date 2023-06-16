import React from "react";
import { render } from "@testing-library/react";
import { CountryDropdown } from "components/CountryDropdown";
import '@testing-library/jest-dom';


describe('CountryDropdown', () => {
    it('Dropdown button should show add a country when no countries are selected', () => {
        const setSelectedCountry = jest.fn();
        const { getByText } = render(
            <CountryDropdown setSelectedCountry={setSelectedCountry} />
        );

        expect(getByText('Add a country')).toBeInTheDocument();
    });
}
)