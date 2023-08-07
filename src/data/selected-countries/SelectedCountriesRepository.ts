import { JSONtoMap, maptoJSON } from "../../utils/helpers/jsonHelpers";
import { CountryName } from "../constants/CountryEmissions";
import { IStorageRepository } from "../storage/IStorageRepository";
import { StorageKeys } from "../storage/StorageKeys";
import { isSelectedCountriesMap } from "./CountryNames";

export const SelectedCountriesRepository = {
    getSelectedCountriesAndPercentages: async function (): Promise<
        Map<CountryName, number>
    > {
        const data = await IStorageRepository.instance.get<string>(
            StorageKeys.selectedCountries,
            maptoJSON(new Map<CountryName, number>([]))
        );
        const map = JSONtoMap(data);
        if (!isSelectedCountriesMap(map)) {
            throw Error(`data ${data} is not a valid map`);
        }
        return map;
    },

    addSelectedCountry: async function (
        countryName: CountryName
    ): Promise<void> {
        const newMap = await this.getSelectedCountriesAndPercentages();

        if (!newMap.has(countryName)) {
            newMap.set(countryName, 0);
        }

        await IStorageRepository.instance.set(
            StorageKeys.selectedCountries,
            maptoJSON(newMap)
        );
    },

    removeSelectedCountry: async function (
        countryName: CountryName
    ): Promise<void> {
        const newMap = await this.getSelectedCountriesAndPercentages();

        if (newMap.has(countryName)) {
            newMap.delete(countryName);
        }

        await IStorageRepository.instance.set(
            StorageKeys.selectedCountries,
            maptoJSON(newMap)
        );
    },

    setSelectedCountryPercentage: async function (
        countryName: CountryName,
        percentage: number
    ): Promise<void> {
        const newMap = await this.getSelectedCountriesAndPercentages();

        if (newMap.has(countryName)) {
            newMap.set(countryName, percentage);
        } else {
            throw Error(
                `SelectedCountriesRemoteDataSource.setSelectedCountryPercentage: countryName ${countryName} not found`
            );
        }

        await IStorageRepository.instance.set(
            StorageKeys.selectedCountries,
            maptoJSON(newMap)
        );
    },
};
