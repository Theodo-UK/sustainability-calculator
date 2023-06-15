import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { LocationDropdown } from "components/LocationDropdown";
import { Country } from "constants/country";

describe('LocationDropdown', () => {
    it('calls setSelectedLocation with the correct country', () => {
        const selectedLocation = { country: Country["United Kingdom"], value: 123 }
        const setSelectedLocation = jest.fn();
        const { getByText } = render(
            <LocationDropdown selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        );

        fireEvent.click(getByText('United Kingdom'));
        fireEvent.click(getByText('Austria'));


        expect(setSelectedLocation).toHaveBeenCalledWith({ country: Country["Austria"], value: 111.2 });
    });
}
)