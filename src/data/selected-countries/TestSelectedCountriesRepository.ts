import { CountryName } from "../constants/CountryEmissions";
import { ISelectedCountriesRepository } from "./ISelectedCountriesRepository";

export class TestSelectedCountriesRepository
    implements ISelectedCountriesRepository
{
    private _selectedCountries: Map<CountryName, number> = new Map<
        CountryName,
        number
    >([["World Average", 0]]);

    async getSelectedCountriesAndPercentages(): Promise<
        Map<CountryName, number>
    > {
        return this._selectedCountries;
    }

    async addSelectedCountry(countryName: CountryName): Promise<void> {
        const newMap = new Map(this._selectedCountries);
        if (!newMap.has(countryName)) {
            newMap.set(countryName, 0);
        }
        this._selectedCountries = newMap;
    }

    async removeSelectedCountry(countryName: CountryName): Promise<void> {
        const newMap = new Map(this._selectedCountries);
        if (newMap.has(countryName)) {
            newMap.delete(countryName);
        }
        this._selectedCountries = newMap;
    }

    async setSelectedCountryPercentage(
        countryName: CountryName,
        percentage: number
    ): Promise<void> {
        const newMap = new Map(this._selectedCountries);
        if (newMap.has(countryName)) {
            newMap.set(countryName, percentage);
        }
        this._selectedCountries = newMap;
    }
}
