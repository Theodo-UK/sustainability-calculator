// Test if clicking a country in the LocationDropdown component calls the setSelectedLocation function with the correct country.

import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { LocationDropdown } from "components/LocationDropdown";

describe('LocationDropdown', () => {
    it('calls setSelectedLocation with the correct country', () => {
        const selectedLocation = { country: "United Kingdom", value: 123 }
        const setSelectedLocation = jest.fn();
        const { getByText } = render(
            <LocationDropdown selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        );

        fireEvent.click(getByText('United Kingdom')); // click on default value to open dropdown
        fireEvent.click(getByText('Austria')); // click Austria to invoke setSelectedLocation


        expect(setSelectedLocation).toHaveBeenCalledWith({ country: "Austria", value: 111.2 });
    });
}
)