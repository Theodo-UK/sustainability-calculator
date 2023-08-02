import React, { createContext } from "react";
import { UserType } from "../../../data/calculations/ICalculationsRepository";
import { useRecording } from "./useRecording";
interface Props {
    children: React.ReactNode;
}

export type RecordingContextType = {
    startRecording: () => Promise<boolean>;
    stopRecording: () => Promise<void>;
    bytesTransferred: number;
    emissions: number;
    error: string | undefined;
    userType: UserType;
    setUserType: (userType: UserType) => void;
};

export const RecordingContext = createContext<RecordingContextType | null>(
    null
);

export const RecordingProvider = ({ children }: Props) => {
    const selectedCountriesContext = useRecording();

    return (
        <RecordingContext.Provider value={selectedCountriesContext}>
            {children}
        </RecordingContext.Provider>
    );
};
