import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import { IStorageRepository } from "../../data/storage/IStorageRepository";
import "./../../input.css";
import {
    SelectedCountriesContextType,
    useSelectedCountriesContext,
} from "./initSelectedCountriesContext";
import { ErrorPage } from "./pages/ErrorPage";
import { LandingPage } from "./pages/LandingPage";
import { RecordingPage } from "./pages/RecordingPage";
import { ResultsPage } from "./pages/ResultsPage";
import { useMountEffect } from "./useOnceAfterFirstMount";
import { usePopup } from "./usePopup";

type Page = "landing" | "recording" | "results";

export const Popup = () => {
    const SelectedCountriesContext =
        createContext<SelectedCountriesContextType | null>(null);
    const selectedCountriesContext = useSelectedCountriesContext();
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
    } = usePopup(selectedCountriesContext);

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
        <SelectedCountriesContext.Provider value={selectedCountriesContext}>
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
        </SelectedCountriesContext.Provider>
    );
};

const rootElement = document.getElementById("react-target");

if (!rootElement) {
    throw new Error("Couldn't find react target");
}

createRoot(rootElement).render(<Popup />);
