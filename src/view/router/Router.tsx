import React, { useState } from "react";
import { IPageRepository, Page } from "../../data/page/IPageRepository";
import { ErrorPage } from "../popup/pages/ErrorPage";
import { LandingPage } from "../popup/pages/LandingPage";
import { RecordingPage } from "../popup/pages/RecordingPage";
import { ResultsPage } from "../popup/pages/ResultsPage";
import { useMountEffect } from "../popup/useOnceAfterFirstMount";
import { usePopup } from "../popup/usePopup";
import { useRootContext } from "../provider/useRootContext";

export const Router = () => {
    const { selectedCountriesContext } = useRootContext();

    const {
        bytesTransferred,
        emissions,
        refreshAndGetSize,
        stopRecording,
        refreshCalculationHistory,
        calculationHistory,
        userType,
        setUserType,
        error,
    } = usePopup();

    const [page, setPage] = useState<Page>("landing");
    const pageRepository = IPageRepository.instance;

    const goToPage = (page: Page) => {
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

    let pageComponent;

    switch (page) {
        case "landing":
            pageComponent = (
                <LandingPage
                    onRecordButtonPress={async () => {
                        goToPage("recording");
                        await refreshAndGetSize();
                    }}
                />
            );
            break;
        case "recording":
            pageComponent = (
                <RecordingPage
                    onStopButtonPress={async () => {
                        await stopRecording();
                        goToPage("results");
                    }}
                    bytesTransferred={bytesTransferred}
                    emissions={emissions}
                />
            );
            break;
        case "results":
            pageComponent = (
                <ResultsPage
                    onRestartButtonPress={async () => {
                        goToPage("recording");
                        await refreshAndGetSize();
                    }}
                    recordings={calculationHistory}
                    selectedCountries={
                        selectedCountriesContext.selectedCountries
                    }
                    addSelectedCountry={
                        selectedCountriesContext.addSelectedCountry
                    }
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
            );
            break;
        default:
            pageComponent = <ErrorPage />;
    }
    return (
        <div className="p-10 w-96 flex flex-col justify-stretch gap-6">
            {pageComponent}
        </div>
    );
};
