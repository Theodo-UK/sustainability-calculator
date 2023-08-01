import { JSONtoMap, maptoJSON } from "../../utils/helpers/jsonHelpers";
import { CountryName } from "../constants/CountryEmissions";
import { IStorageRepository } from "../storage/IStorageRepository";
import { ISelectedCountriesRepository } from "./ISelectedCountriesRepository";

export class SelectedCountriesRepository
    implements ISelectedCountriesRepository
{
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getSelectedCountriesAndPercentages(): Promise<
        Map<CountryName, number>
    > {
        const data = await this.remoteDataSource.get<string>(
            "selectedCountriesAndPercentages",
            maptoJSON(new Map<CountryName, number>([]))
        );

        return JSONtoMap(data) as Map<CountryName, number>;
    }

    async addSelectedCountry(countryName: CountryName): Promise<void> {
        const newMap = await this.getSelectedCountriesAndPercentages();

        if (!newMap.has(countryName)) {
            newMap.set(countryName, 0);
        }

        await this.remoteDataSource.set({
            selectedCountriesAndPercentages: maptoJSON(newMap),
        });
    }

    async removeSelectedCountry(countryName: CountryName): Promise<void> {
        const newMap = await this.getSelectedCountriesAndPercentages();

        if (newMap.has(countryName)) {
            newMap.delete(countryName);
        }

        await this.remoteDataSource.set({
            selectedCountriesAndPercentages: maptoJSON(newMap),
        });
    }

    async setSelectedCountryPercentage(
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

        await this.remoteDataSource.set({
            selectedCountriesAndPercentages: maptoJSON(newMap),
        });
    }
}
