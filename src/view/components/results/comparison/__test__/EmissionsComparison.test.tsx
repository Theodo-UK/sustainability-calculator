import React from "react";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { CalculationData } from "../../../../../data/calculations/ICalculationsRepository";
import { CountryName } from "../../../../../data/constants/CountryEmissions";
import { EmissionsComparison } from "../EmissionsComparison";

describe("EmissionsComparison", () => {
    it("renders the correct image and description", () => {
        const { getByText, getByTestId } = render(
            <EmissionsComparison
                calculation={
                    new CalculationData(
                        0,
                        0.199,
                        0,
                        new Map<CountryName, number>(),
                        0,
                        0,
                        "new user"
                    )
                }
            />
        );

        expect(getByText("1 Google Search")).toBeInTheDocument();
        expect(getByTestId("Google Search")).toBeInTheDocument();
    });
});
