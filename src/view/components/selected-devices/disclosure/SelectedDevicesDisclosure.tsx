import { Disclosure } from "@headlessui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { DeviceDropdown } from "../dropdown/DeviceDropdown";
import { SelectedDevicesList } from "../selected/SelectedDevicesList";
import { useSelectedDevicesDisclosure } from "./useSelectedDevicesDisclosure";

export const SelectedDevicesDisclosure = () => {
    const { selectedDevices } = useSelectedDevicesDisclosure();

    return (
        <div>
            <Disclosure>
                <Disclosure.Button className="px-4 flex justify-between items-center w-full text-black bg-nyanza border-nyanza border-4 ui-open:border-b-0 rounded-lg ui-open:rounded-b-none hover:bg-opacity-50 focus:outline-none focus-visible:ring focus-visible:ring-myrtle-green focus-visible:ring-opacity-75">
                    <h2 className="py-2 text-sm font-medium text-left">
                        {`My users are using... (${selectedDevices.size} selected)`}
                    </h2>
                    <FaEdit className="text-gray-800 text-sm font-medium" />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 py-2 border-nyanza border-4 border-t-0 rounded-b-2xl rounded-t-none">
                    <SelectedDevicesList />
                    <DeviceDropdown />
                </Disclosure.Panel>
            </Disclosure>
        </div>
    );
};
