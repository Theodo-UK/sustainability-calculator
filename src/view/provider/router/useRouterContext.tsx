import React, { useState } from "react";
import { IPageRepository, PageType } from "../../../data/page/IPageRepository";
import { ErrorPage } from "../../pages/ErrorPage";
import { RecordingPage } from "../../pages/RecordingPage";
import { ResultsPage } from "../../pages/ResultsPage";
import { LandingPage } from "../../pages/landing/LandingPage";
import { useMountEffect } from "../../popup/useOnceAfterFirstMount";
import { RouterContextType } from "./RouterProvider";

export const useRouterContext = (): RouterContextType => {
    const [page, setPage] = useState<PageType>("landing");
    const pageRepository = IPageRepository.instance;

    const goToPage = (page: PageType) => {
        setPage(page);
        pageRepository.setCurrentPage(page);
    };

    useMountEffect(() => {
        pageRepository.getCurrentPage().then(async (page) => {
            if (page === "results") {
                await refreshCalculationHistory();
            }
            setPage(page);
        });
    });

    const pageComponents: Record<PageType, React.JSX.Element> = {
        landing: <LandingPage />,
        recording: <RecordingPage />,
        results: (
            <ResultsPage
                onRestartButtonPress={async () => {
                    if (await startRecording()) {
                        goToPage("recording");
                    }
                }}
                recordings={calculationHistory}
                selectedCountries={selectedCountriesContext.selectedCountries}
                addSelectedCountry={selectedCountriesContext.addSelectedCountry}
                removeSelectedCountry={
                    selectedCountriesContext.removeSelectedCountry
                }
                setCountryPercentage={
                    selectedCountriesContext.setCountryPercentage
                }
                userType={userType}
                setUserType={setUserType}
                error={error}
            />
        ),
    };

    const renderPage = () => {
        try {
            return pageComponents[page];
        } catch (error: unknown) {
            return <ErrorPage />;
        }
    };
    return {
        goToPage,
        renderPage,
    };
};
