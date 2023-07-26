import React from "react";
import { SelectedCountriesProvider } from "./selected-countries/SelectedCountriesProvider";
interface RootProviderProps {
    children: React.ReactNode;
}

export const RootProvider = (props: RootProviderProps) => {
    return (
        <SelectedCountriesProvider>{props.children}</SelectedCountriesProvider>
    );
};
