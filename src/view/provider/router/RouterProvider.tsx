import React, { createContext } from "react";
import { PageType } from "../../../data/page/IPageRepository";
import { useRouter } from "./useRouter";
interface Props {
    children: React.ReactNode;
}

export type RouterContextType = {
    renderPage: () => React.JSX.Element;
    goToPage: (page: PageType) => void;
};

export const RouterContext = createContext<RouterContextType | null>(null);

export const RouterProvider = ({ children }: Props) => {
    const selectedCountriesContext = useRouter();

    return (
        <RouterContext.Provider value={selectedCountriesContext}>
            {children}
        </RouterContext.Provider>
    );
};
