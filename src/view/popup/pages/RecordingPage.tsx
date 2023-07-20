import React from "react";
import {
    formatBytes,
    formatEmissions,
} from "../../../utils/helpers/formatNumbersToString";
import { ITooltip } from "../../../view/components/atomic/ITooltip";
import { CircularButton } from "../../components/atomic/CircularButton";

type RecordingPageProps = {
    onStopButtonPress: () => void;
    bytesTransferred: number;
    emissions: number;
};

export const RecordingPage = ({
    onStopButtonPress,
    bytesTransferred,
    emissions,
}: RecordingPageProps) => {
    return (
        <>
            <div className="absolute top-1 right-1">
                <ITooltip
                    text="Stopping this recording will store<br />the data in your calculations history"
                    id="recording-page"
                />
            </div>
            <div className="p-10 pb-20 w-96 flex flex-col justify-stretch gap-6">
                <h1 className="text-2xl font-bold text-center">
                    Recording in progress
                </h1>
                <div className="py-2 px-4 gap-2 text-base bg-nyanza text-center rounded-2xl shadow font-medium">
                    <p>{formatBytes(bytesTransferred)}</p>
                    <p>{formatEmissions(emissions)}</p>
                </div>
                <CircularButton
                    text="Stop Recording"
                    onClick={onStopButtonPress}
                    colour="burgundy"
                >
                    -
                </CircularButton>
            </div>
        </>
    );
};
