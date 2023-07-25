import React from "react";
import { FaSyncAlt } from "react-icons/fa";
import {
    CalculationDataType,
    UserType,
} from "../../../data/calculations/ICalculationsRepository";
import {
    formatBytes,
    formatEmissions,
} from "../../../utils/helpers/formatNumbersToString";
import { Button } from "../../components/atomic/Button";
import { SwitchAtom } from "../../components/atomic/SwitchAtom";
import { CalculationHistory } from "../../components/calculation-history/CalculationHistory";
import { CountriesDisclosure } from "../../components/countries-disclosure/CountriesDisclosure";
import { DevicesDisclosure } from "../../components/devices-disclosure/DevicesDisclosure";
import { EmissionsComparison } from "../../components/emissions-comparison/EmissionsComparison";

type ResultsPageProps = {
    onRestartButtonPress: () => void;
    recordings: CalculationDataType[];
    selectedCountries: Map<string, number>;
    addSelectedCountry: (country: string) => Promise<void>;
    removeSelectedCountry: (country: string) => Promise<void>;
    setCountryPercentage: (
        country: string,
        percentage: number
    ) => Promise<void>;
    userType: UserType;
    setUserType: (userType: UserType) => void;
    error: string | undefined;
};

export const ResultsPage = ({
    onRestartButtonPress,
    recordings,
    selectedCountries,
    addSelectedCountry,
    removeSelectedCountry,
    setCountryPercentage,
    userType,
    setUserType,
    error,
}: ResultsPageProps) => {
    const isReturningUser = userType === "returning user";
    return (
        <>
            <h1 className="text-2xl font-bold text-center">
                Sustainability Calculator
            </h1>
            <CountriesDisclosure
                selectedCountries={selectedCountries}
                addSelectedCountry={addSelectedCountry}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
            <DevicesDisclosure
                selectedDevices={selectedCountries}
                addSelectedDevice={addSelectedCountry}
                removeSelectedDevice={removeSelectedCountry}
                setDevicePercentage={setCountryPercentage}
            />
            <div className=" h-32 grid grid-cols-2 text-base bg-nyanza rounded-2xl shadow font-medium">
                <p className="text-center flex flex-wrap content-center justify-center">
                    {formatBytes(recordings[0].bytes)}
                    <br />
                    {`${formatEmissions(recordings[0].specificEmissions)}
                        gCO2/GB`}
                    <br />
                    {`${formatEmissions(recordings[0].emissions)} g of CO2`}
                </p>
                <EmissionsComparison calculation={recordings[0]} />
            </div>
            <Button onClick={onRestartButtonPress} colour="light-green">
                <div className="flex flex-row gap-2 items-center">
                    <FaSyncAlt />
                    <p>Restart recording</p>
                </div>
            </Button>
            <div className="h-6 text-base flex justify-between items-center">
                <p>Returning user?</p>
                <div className="flex flex-row gap-2 items-center">
                    <p>{isReturningUser ? "Yes" : "No"}</p>
                    <SwitchAtom
                        checked={isReturningUser}
                        onChange={(checked) =>
                            setUserType(checked ? "returning user" : "new user")
                        }
                    />
                </div>
            </div>
            <CalculationHistory calculationHistory={recordings} />
            {error && <p>{error}</p>}
        </>
    );
};
