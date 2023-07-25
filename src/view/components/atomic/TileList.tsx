import React, { useEffect } from "react";
import { TileTooltip } from "./TileTooltip";

type SelectedElementsProps = {
    elementMap: Map<string, number>;
    removeElement: (element: string) => void;
    setElementPercentage: (element: string, percentage: number) => void;
};

const PERCENTAGE_ERROR_MESSAGE = "Percentages must stay between 0% and 100%";

export const TileList = ({
    elementMap,
    removeElement,
    setElementPercentage,
}: SelectedElementsProps) => {
    const [worldPercentage, setWorldPercentage] = React.useState(1);
    const [isPercentageError, setIsPercentageError] = React.useState(false);

    useEffect(() => {
        const totalPercentage = Array.from(elementMap.values()).reduce(
            (total, entry) => total + entry,
            0
        );
        setWorldPercentage(1 - totalPercentage);
    }, [elementMap]);

    useEffect(() => {
        const hasPercentageError = Array.from(elementMap.values()).some(
            (percentage) => percentage > 1 || percentage < 0
        );
        const worldHasError = worldPercentage > 1 || worldPercentage < 0;
        setIsPercentageError(hasPercentageError || worldHasError);
    }, [elementMap, worldPercentage]);

    return (
        <div className="w-full relative">
            <div className="relative flex items-center text-sm w-full gap-1 p-2 my-2 bg-rose-quartz bg-opacity-20 rounded-lg">
                <div className="flex items-start max-w-[14rem]">
                    <input
                        className="w-12 text-gray-800 bg-gray-100 border border-gray-200 rounded-md shadow-sm pl-1 mr-1"
                        type="string"
                        value={(worldPercentage * 100).toFixed(2)}
                        disabled
                    />
                    <a>% of users following world average</a>
                </div>
                <TileTooltip
                    text="The figure is used by default<br />where values have not been<br />specified for a % of users"
                    id="world-percentage"
                />
            </div>
            <ul>
                {Array.from(elementMap).map(([element, percentage]) => (
                    <li key={element}>
                        <div className="relative flex items-center text-sm w-full p-2 my-2 bg-rose-quartz bg-opacity-20 rounded-lg">
                            <div className="flex items-start max-w-[14rem]">
                                <input
                                    className="w-12 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-1 mr-1"
                                    type="number"
                                    defaultValue={percentage * 100}
                                    onChange={(e) =>
                                        setElementPercentage(
                                            element,
                                            Number(e.target.value) / 100
                                        )
                                    }
                                />
                                <a>% {element}</a>
                            </div>
                            <button
                                className="country-tile-button "
                                onClick={() => removeElement(element)}
                            >
                                -
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="text-red-500">
                {isPercentageError ? PERCENTAGE_ERROR_MESSAGE : null}
            </p>
        </div>
    );
};
