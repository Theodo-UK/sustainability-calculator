import React, { useState } from "react";
import { IStorageRepository } from "../../data/storage/IStorageRepository";
import { ErrorPage } from "../popup/pages/ErrorPage";
import { LandingPage } from "../popup/pages/LandingPage";
import { RecordingPage } from "../popup/pages/RecordingPage";
import { ResultsPage } from "../popup/pages/ResultsPage";
import { useMountEffect } from "../popup/useOnceAfterFirstMount";
import { usePopup } from "../popup/usePopup";
import { useRootContext } from "../provider/useRootContext";

type Page = "landing" | "recording" | "results";

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
    const remoteRepository = IStorageRepository.instance;

    const goToPage = (page: Page) => {
        setPage(page);
        remoteRepository.set({ currentPage: page });
    };

    useMountEffect(() => {
        remoteRepository
            .get({ currentPage: "landing" })
            .then((data) => data.currentPage as Page)
            .then(async (storedPage) => {
                if (storedPage === "results") {
                    await refreshCalculationHistory();
                }
                setPage(storedPage);
            });
    });
    return (
        <div className="p-10 w-96 flex flex-col justify-stretch gap-6">
            {page === "landing" ? (
                <LandingPage
                    onRecordButtonPress={async () => {
                        goToPage("recording");
                        await refreshAndGetSize();
                    }}
                />
            ) : page === "recording" ? (
                <RecordingPage
                    onStopButtonPress={async () => {
                        await stopRecording();
                        goToPage("results");
                    }}
                    bytesTransferred={bytesTransferred}
                    emissions={emissions}
                />
            ) : page === "results" ? (
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
            ) : (
                <ErrorPage />
            )}
        </div>
    );
};
