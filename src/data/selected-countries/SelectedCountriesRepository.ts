import { CountryName } from "../constants/CountryEmissions";
import { JSONtoMap, maptoJSON } from "../../helpers/jsonHelpers";
import { IStorageRepository } from "../storage/IStorageRepository";
import { ISelectedCountriesRepository } from "./ISelectedCountriesRepository";

export class SelectedCountriesRepository
    implements ISelectedCountriesRepository
{
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getSelectedCountriesAndPercentages(): Promise<
        Map<CountryName, number>
    > {
        try {
            const data = await this.remoteDataSource.get({
                selectedCountriesAndPercentages: maptoJSON(
                    new Map<CountryName, number>([["World Average", 0]])
                ),
            });

            return JSONtoMap(
                data["selectedCountriesAndPercentages"] as string
            ) as Map<CountryName, number>;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async addSelectedCountry(countryName: CountryName): Promise<void> {
        try {
            const newMap = await this.getSelectedCountriesAndPercentages();

            if (!newMap.has(countryName)) {
                newMap.set(countryName, 0);
            }

            await this.remoteDataSource.set({
                selectedCountriesAndPercentages: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async removeSelectedCountry(countryName: CountryName): Promise<void> {
        try {
            const newMap = await this.getSelectedCountriesAndPercentages();

            if (newMap.has(countryName)) {
                newMap.delete(countryName);
            }

            await this.remoteDataSource.set({
                selectedCountriesAndPercentages: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async setSelectedCountryPercentage(
        countryName: CountryName,
        percentage: number
    ): Promise<void> {
        try {
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
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
