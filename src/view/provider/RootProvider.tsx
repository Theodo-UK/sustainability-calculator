import React from "react";
import { HistoryProvider } from "./history/HistoryProvider";
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
                <HistoryProvider>
                    <RecordingProvider>{children}</RecordingProvider>
                </HistoryProvider>
            </SelectedDevicesProvider>
        </SelectedCountriesProvider>
    );
};
