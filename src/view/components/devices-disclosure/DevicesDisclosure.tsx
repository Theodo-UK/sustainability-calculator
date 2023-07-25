import React from "react";
import { DEVICE_CO2_EMISSIONS_GRAMS_PER_HOUR } from "../../../data/constants/DeviceEmissions";
import { Dropdown } from "../atomic/Dropdown";
import { StyledDisclosure } from "../atomic/StyledDisclosure";
import { TileList } from "../atomic/TileList";

type SelectedDevicesDisclosureProps = {
    selectedDevices: Map<string, number>;
    addSelectedDevice: (device: string) => Promise<void>;
    removeSelectedDevice: (device: string) => Promise<void>;
    setDevicePercentage: (device: string, percentage: number) => Promise<void>;
};

export const DevicesDisclosure = ({
    selectedDevices,
    addSelectedDevice,
    removeSelectedDevice,
    setDevicePercentage,
}: SelectedDevicesDisclosureProps) => {
    return (
        <StyledDisclosure
            title={`The devices used are... (${selectedDevices.size} selected)`}
        >
            <TileList
                elementMap={selectedDevices}
                removeElement={removeSelectedDevice}
                setElementPercentage={setDevicePercentage}
            />
            <Dropdown
                addSelectedElement={addSelectedDevice}
                selectedElements={selectedDevices}
                fullList={Object.keys(DEVICE_CO2_EMISSIONS_GRAMS_PER_HOUR)}
                placeholder="Add a device"
            />
        </StyledDisclosure>
    );
};
