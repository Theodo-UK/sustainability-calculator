import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB,
    CountryName,
} from "../../../data/constants/CountryEmissions";

type CountryDropdownType = {
    addSelectedCountry: (country: CountryName) => void;
    selectedCountries: Map<CountryName, number>;
};

export const CountryDropdown = ({
    addSelectedCountry,
    selectedCountries,
}: CountryDropdownType) => {
    const filteredCountries = Object.keys(
        COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB
    ).filter((country) => !selectedCountries.has(country as CountryName));

    const [query, setQuery] = React.useState("");

    const displayedCountries =
        query === ""
            ? filteredCountries
            : filteredCountries.filter((country) =>
                  country
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div className="relative w-full">
            <Combobox value={""} onChange={addSelectedCountry}>
                <Combobox.Input
                    className="w-full px-3 py-2 text-black bg-rose-quartz bg-opacity-20 rounded-md shadow-sm focus:border focus:outline-none focus:ring-myrtle-green focus:border-myrtle-green sm:text-sm"
                    placeholder="Add a country"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-2 text-base bg-gray-200 hover:bg-white hover:shadow-inner rounded-lg w-6 h-6 my-auto">
                    +
                </Combobox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options className="absolute overflow-auto w-full max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {displayedCountries.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            displayedCountries.map((country) => (
                                <Combobox.Option
                                    key={country}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-4 ${
                                            active
                                                ? "bg-nyanza text-myrtle-green"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={country}
                                >
                                    {country}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </Combobox>
        </div>
    );
};
