import React, { createContext } from "react";
import { useRecordingContext } from "./useRecordingContext";
interface Props {
    children: React.ReactNode;
}

export type RecordingContextType = {
    startRecording: () => Promise<boolean>;
};

export const RecordingContext = createContext<RecordingContextType | null>(
    null
);

export const RecordingProvider = ({ children }: Props) => {
    const selectedCountriesContext = useRecordingContext();

    return (
        <RecordingContext.Provider value={selectedCountriesContext}>
            {children}
        </RecordingContext.Provider>
    );
};
