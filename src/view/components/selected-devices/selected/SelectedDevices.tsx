import React from "react";
import { PERCENTAGE_ERROR_MESSAGE } from "../../../../utils/constants";
import { TileTooltip } from "../../atomic/TileTooltip";
import { useSelectedDevices } from "./useSelectedDevices";

export const SelectedDevices = () => {
    const {
        isPercentageError,
        averagePercentage,
        selectedDevices,
        removeSelectedDevice,
        setDevicePercentage,
    } = useSelectedDevices();
    return (
        <div className="w-full relative">
            <div className="relative flex items-center text-sm w-full gap-1 p-2 my-2 bg-rose-quartz bg-opacity-20 rounded-lg">
                <div className="flex items-start max-w-[14rem]">
                    <input
                        className="w-12 text-gray-800 bg-gray-100 border border-gray-200 rounded-md shadow-sm pl-1 mr-1"
                        type="string"
                        value={(averagePercentage * 100).toFixed(2)}
                        disabled
                    />
                    <a>% of users following average device emissions</a>
                </div>
                <TileTooltip
                    text="The figure is used by default<br />where devices have not been<br />specified for a % of users"
                    id="world-percentage"
                />
            </div>
            <ul>
                {Array.from(selectedDevices).map(([device, percentage]) => (
                    <li key={device}>
                        <div className="relative flex items-center text-sm w-full p-2 my-2 bg-rose-quartz bg-opacity-20 rounded-lg">
                            <div className="flex items-start max-w-[14rem]">
                                <input
                                    className="w-12 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-1 mr-1"
                                    type="number"
                                    defaultValue={percentage * 100}
                                    onChange={(e) =>
                                        setDevicePercentage(
                                            device,
                                            Number(e.target.value) / 100
                                        )
                                    }
                                />
                                <a>% in {device}</a>
                            </div>
                            <button
                                className="country-tile-button "
                                onClick={() => removeSelectedDevice(device)}
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
