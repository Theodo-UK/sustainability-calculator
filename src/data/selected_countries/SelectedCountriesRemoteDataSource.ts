import { CountryName } from "../../constants/Countries";
import { JSONtoMap, maptoJSON } from "../../helpers/jsonHelpers";

export class SelectedCountriesRemoteDataSource {
    async getSelectedCountriesAndPercentages(): Promise<
        Map<CountryName, number>
    > {
        try {
            const data = await chrome.storage.local.get(
                "selectedCountriesAndPercentages"
            );

            if (data["selectedCountriesAndPercentages"] === undefined) {
                const defaultMap = new Map<CountryName, number>([
                    ["World Average", 0],
                ]);

                await chrome.storage.local.set({
                    selectedCountriesAndPercentages: maptoJSON(defaultMap),
                });

                return defaultMap;
            }

            return JSONtoMap(data["selectedCountriesAndPercentages"]) as Map<
                CountryName,
                number
            >;
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

            await chrome.storage.local.set({
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

            await chrome.storage.local.set({
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

            await chrome.storage.local.set({
                selectedCountriesAndPercentages: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
