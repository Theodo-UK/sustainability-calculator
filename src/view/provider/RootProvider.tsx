import React, { createContext } from "react";
import {
    SelectedCountriesContextType,
    useSelectedCountriesContext,
} from "../popup/initSelectedCountriesContext";
interface RootProviderProps {
    children: React.ReactNode;
}
export const SelectedCountriesContext =
    createContext<SelectedCountriesContextType | null>(null);

export const RootProvider = (props: RootProviderProps) => {
    const selectedCountriesContext = useSelectedCountriesContext();

    return (
        <SelectedCountriesContext.Provider value={selectedCountriesContext}>
            {props.children}{" "}
        </SelectedCountriesContext.Provider>
    );
};
