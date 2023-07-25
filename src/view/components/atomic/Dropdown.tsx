import { Combobox, Transition } from "@headlessui/react";
import React from "react";

type DropdownProps = {
    addSelectedElement: (country: string) => void;
    selectedElements: Map<string, number>;
    fullList: string[];
    placeholder: string;
};

export const Dropdown = ({
    addSelectedElement,
    selectedElements,
    fullList,
    placeholder,
}: DropdownProps) => {
    const filteredList = fullList.filter(
        (element) => !selectedElements.has(element)
    );

    const [query, setQuery] = React.useState("");

    const displayedList =
        query === ""
            ? filteredList
            : filteredList.filter((element) =>
                  element
                      .toLowerCase()
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div className="relative w-full">
            <Combobox value={""} onChange={addSelectedElement}>
                <Combobox.Input
                    className="w-full px-3 py-2 text-black bg-rose-quartz bg-opacity-20 rounded-md shadow-sm border border-gray-100 focus:outline-none focus:ring-myrtle-green focus:border-myrtle-green sm:text-sm"
                    placeholder={placeholder}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="inset-y-0 country-tile-button">
                    +
                </Combobox.Button>
                <Transition
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options className="absolute z-10 overflow-auto w-full max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {displayedList.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            displayedList.map((element) => (
                                <Combobox.Option
                                    key={element}
                                    className="relative cursor-default select-none py-2 px-4 ui-active:bg-nyanza ui-active:text-myrtle-green ui-not-active:text-gray-900"
                                    value={element}
                                >
                                    {element}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </Combobox>
        </div>
    );
};
