import React from "react";
import { RecordingProvider } from "./recording/RecordingProvider";
import { SelectedCountriesProvider } from "./selected-countries/SelectedCountriesProvider";
import { SelectedDevicesProvider } from "./selected-devices/SelectedDevicesProvider";
interface RootProviderProps {
    children: React.ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
    return (
        <SelectedCountriesProvider>
            <SelectedDevicesProvider>
                <RecordingProvider>{children}</RecordingProvider>
            </SelectedDevicesProvider>
        </SelectedCountriesProvider>
    );
};
