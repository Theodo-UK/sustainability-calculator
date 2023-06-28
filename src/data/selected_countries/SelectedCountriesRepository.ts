import { CountryName } from "../../constants/Countries";
import { ISelectedCountriesRepository } from "./ISelectedCountriesRepository";
import { SelectedCountriesRemoteDataSource } from "./SelectedCountriesRemoteDataSource";

export class SelectedCountriesRepository
    implements ISelectedCountriesRepository
{
    remoteDataSource: SelectedCountriesRemoteDataSource =
        new SelectedCountriesRemoteDataSource();

    async getSelectedCountriesAndPercentages(): Promise<
        Map<CountryName, number>
    > {
        let selectedCountriesAndPercentages: Map<CountryName, number> | null =
            null;

        try {
            selectedCountriesAndPercentages =
                await this.remoteDataSource.getSelectedCountriesAndPercentages();
        } catch (e: unknown) {
            throw Error(e as string);
        }

        if (selectedCountriesAndPercentages === null) {
            throw Error("selectedCountriesAndPercentages is undefined");
        }

        return selectedCountriesAndPercentages;
    }

    async addSelectedCountry(countryName: CountryName): Promise<void> {
        try {
            await this.remoteDataSource.addSelectedCountry(countryName);
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async removeSelectedCountry(countryName: CountryName): Promise<void> {
        try {
            await this.remoteDataSource.removeSelectedCountry(countryName);
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async setSelectedCountryPercentage(
        countryName: CountryName,
        percentage: number
    ): Promise<void> {
        try {
            await this.remoteDataSource.setSelectedCountryPercentage(
                countryName,
                percentage
            );
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
