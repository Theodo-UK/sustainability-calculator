import { CountryName } from "../../constants/Countries";

export class SelectedCountriesRemoteDataSource {
    async getSelectedCountriesAndPercentages(): Promise<
        Map<CountryName, number>
    > {
        try {
            const data = (
                await chrome.storage.local.get(
                    "selectedCountriesAndPercentages"
                )
            )["selectedCountriesAndPercentages"];
            console.log(`getSelectedCountriesAndPercentages: ${data}`);
            if (data === undefined) {
                throw Error(
                    "SelectedCountriesRemoteDataSource.getSelectedCountriesAndPercentages: data is undefined"
                );
            }
            return data;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async addSelectedCountry(countryName: CountryName): Promise<void> {
        try {
            const data = (
                await chrome.storage.local.get(
                    "selectedCountriesAndPercentages"
                )
            )["selectedCountriesAndPercentages"];

            console.log(`addSelectedCountry: ${data}`);
            const newMap = new Map<CountryName, number>();

            if (!newMap.has(countryName)) {
                newMap.set(countryName, 0);
            }

            await chrome.storage.local.set({
                selectedCountriesAndPercentages: newMap,
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
    async removeSelectedCountry(countryName: CountryName): Promise<void> {
        try {
            const data = (
                await chrome.storage.local.get(
                    "selectedCountriesAndPercentages"
                )
            )["selectedCountriesAndPercentages"];

            console.log(`removeSelectedCountry: ${data}`);
            const newMap = new Map<CountryName, number>();

            if (newMap.has(countryName)) {
                newMap.delete(countryName);
            }

            await chrome.storage.local.set({
                selectedCountriesAndPercentages: newMap,
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
            const data = (
                await chrome.storage.local.get(
                    "selectedCountriesAndPercentages"
                )
            )["selectedCountriesAndPercentages"];

            console.log(`setSelectedCountryPercentage: ${data}`);
            const newMap = new Map<CountryName, number>();

            if (newMap.has(countryName)) {
                newMap.set(countryName, percentage);
            } else {
                throw Error(
                    `SelectedCountriesRemoteDataSource.setSelectedCountryPercentage: countryName ${countryName} not found`
                );
            }

            await chrome.storage.local.set({
                selectedCountriesAndPercentages: newMap,
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
