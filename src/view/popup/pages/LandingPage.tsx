import React from "react";
import { Button } from "../../components/atomic/Button";

export const LandingPage = ({
    onRecordButtonPress,
}: {
    onRecordButtonPress: () => void;
}) => {
    return (
        <div className="p-10 w-80">
            <h1 className="text-3xl font-bold underline">
                Sustainability Calculator
            </h1>
            <Button onClick={onRecordButtonPress}>Start recording</Button>
        </div>
    );
};
