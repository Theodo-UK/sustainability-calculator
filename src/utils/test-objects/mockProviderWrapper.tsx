import React from "react";
import {
    SelectedCountriesContext,
    SelectedCountriesContextType,
} from "../../view/provider/selected-countries/SelectedCountriesProvider";
import {
    SelectedDevicesContext,
    SelectedDevicesContextType,
} from "../../view/provider/selected-devices/SelectedDevicesProvider";

export const mockProviderWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const selectedCountriesContext: SelectedCountriesContextType = {
        selectedCountries: new Map([]),
        addSelectedCountry: jest.fn(),
        removeSelectedCountry: jest.fn(),
        validatePercentages: jest.fn(),
        setCountryPercentage: jest.fn(),
    };

    const selectedDevicesContext: SelectedDevicesContextType = {
        selectedDevices: new Map([]),
        addSelectedDevice: jest.fn(),
        removeSelectedDevice: jest.fn(),
        validatePercentages: jest.fn(),
        setDevicePercentage: jest.fn(),
    };

    return (
        <SelectedCountriesContext.Provider value={selectedCountriesContext}>
            <SelectedDevicesContext.Provider value={selectedDevicesContext}>
                {children}
            </SelectedDevicesContext.Provider>
        </SelectedCountriesContext.Provider>
    );
};
