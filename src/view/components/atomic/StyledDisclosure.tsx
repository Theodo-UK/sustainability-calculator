import { Disclosure } from "@headlessui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";

type DisclosureProps = {
    title: string;
    children: React.ReactNode;
};

export const StyledDisclosure = ({ title, children }: DisclosureProps) => {
    return (
        <div>
            <Disclosure>
                <Disclosure.Button className="px-4 flex justify-between items-center w-full text-black bg-nyanza border-nyanza border-4 ui-open:border-b-0 rounded-lg ui-open:rounded-b-none hover:bg-opacity-50 focus:outline-none focus-visible:ring focus-visible:ring-myrtle-green focus-visible:ring-opacity-75">
                    <h2 className="py-2 text-sm font-medium text-left">
                        {title}
                    </h2>
                    <FaEdit className="text-gray-800 text-sm font-medium" />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 py-2 border-nyanza border-4 border-t-0 rounded-b-2xl rounded-t-none">
                    {children}
                </Disclosure.Panel>
            </Disclosure>
        </div>
    );
};
