import React from "react";
import { CircularButton } from "../../../view/components/atomic/CircularButton";

export const LandingPage = ({
    onRecordButtonPress,
}: {
    onRecordButtonPress: () => void;
}) => {
    return (
        <div className="p-10 pb-16 w-96 flex flex-col justify-stretch gap-12">
            <h1 className="text-2xl font-bold text-center">
                Sustainability Calculator
            </h1>
            <CircularButton
                text="Start Recording"
                onClick={onRecordButtonPress}
                colour="light-green"
            >
                +
            </CircularButton>
        </div>
    );
};
