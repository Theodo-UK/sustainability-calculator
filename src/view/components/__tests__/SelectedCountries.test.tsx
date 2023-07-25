import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { TileList } from "../atomic/TileList";

describe("TileList", () => {
    let removeSelectedElement: jest.Mock<(arg0: string) => void>;
    let setElementPercentage: jest.Mock<(arg0: string, arg1: number) => void>;
    beforeEach(() => {
        jest.clearAllMocks();
        removeSelectedElement = jest.fn();
        setElementPercentage = jest.fn();
    });
    it("should see a caption mentionning an element when one has been selected", () => {
        const selectedElements = new Map([["Option 1", 0.2]]);
        const { getByText } = render(
            <TileList
                elementMap={selectedElements}
                removeElement={removeSelectedElement}
                setElementPercentage={setElementPercentage}
            />
        );

        expect(getByText("% Option 1")).toBeInTheDocument();
    });
    it("should update the percentage of users of an element when calling setElementPercentage", () => {
        const initPercentage = 0.2;
        const selectedElements = new Map([["Option 1", initPercentage]]);
        const { getByDisplayValue } = render(
            <TileList
                elementMap={selectedElements}
                removeElement={removeSelectedElement}
                setElementPercentage={setElementPercentage}
            />
        );

        const elementInput = getByDisplayValue(initPercentage * 100);
        fireEvent.change(elementInput, { target: { value: "40" } });

        expect(setElementPercentage).toHaveBeenCalledWith("Option 1", 0.4);
    });
    it("should remove an element when clicking on the remove button", () => {
        const selectedElements = new Map([["Option 1", 0.2]]);
        const { getByText } = render(
            <TileList
                elementMap={selectedElements}
                removeElement={removeSelectedElement}
                setElementPercentage={setElementPercentage}
            />
        );

        const removeButton = getByText("-");
        fireEvent.click(removeButton);

        expect(removeSelectedElement).toHaveBeenCalledWith("Option 1");
    });
    describe("Percentage validity: ", () => {
        it("should display an error message when an individual percentage is above 100%", () => {
            const selectedElements = new Map([["Option 1", 1.1]]);
            const { getByText } = render(
                <TileList
                    elementMap={selectedElements}
                    removeElement={removeSelectedElement}
                    setElementPercentage={setElementPercentage}
                />
            );

            expect(
                getByText("Percentages must stay between 0% and 100%")
            ).toBeInTheDocument();
        });
        it("should display an error message when an individual percentage is below 0%", () => {
            const selectedElements = new Map([["Option 1", -0.1]]);
            const { getByText } = render(
                <TileList
                    elementMap={selectedElements}
                    removeElement={removeSelectedElement}
                    setElementPercentage={setElementPercentage}
                />
            );

            expect(
                getByText("Percentages must stay between 0% and 100%")
            ).toBeInTheDocument();
        });
        it("should display an error message when the sum of percentages is above 100%", () => {
            const selectedElements = new Map([
                ["Option 1", 0.5],
                ["Option 2", 0.6],
            ]);
            const { getByText } = render(
                <TileList
                    elementMap={selectedElements}
                    removeElement={removeSelectedElement}
                    setElementPercentage={setElementPercentage}
                />
            );

            expect(
                getByText("Percentages must stay between 0% and 100%")
            ).toBeInTheDocument();
        });
        it("should not display an error message when all percentages are between 0% and 100%", () => {
            const selectedElements = new Map([
                ["Option 1", 0.5],
                ["Option 2", 0.4],
            ]);
            const { queryByText } = render(
                <TileList
                    elementMap={selectedElements}
                    removeElement={removeSelectedElement}
                    setElementPercentage={setElementPercentage}
                />
            );

            expect(
                queryByText("Percentages must stay between 0% and 100%")
            ).not.toBeInTheDocument();
        });
    });
});
