import { CountryName } from "../../constants/Countries";

export class SelectedCountriesLocalDataSource {
    private _selectedCountriesAndPercentages: Map<CountryName, number> =
        new Map<CountryName, number>([["World Average", 0]]);

    getSelectedCountriesAndPercentages(): Map<CountryName, number> {
        if (this._selectedCountriesAndPercentages === undefined) {
            throw Error(
                "SelectedCountriesLocalDataSource._selectedCountriesAndPercentages is undefined"
            );
        }
        return this._selectedCountriesAndPercentages;
    }
    setSelectedCountriesAndPercentages(
        selectedCountriesAndPercentages: Map<CountryName, number>
    ): void {
        this._selectedCountriesAndPercentages = selectedCountriesAndPercentages;
    }

    addSelectedCountry(countryName: CountryName): void {
        if (this._selectedCountriesAndPercentages === undefined) {
            throw Error(
                "SelectedCountriesLocalDataSource._selectedCountriesAndPercentages is undefined"
            );
        }

        const newMap = new Map<CountryName, number>();

        if (!newMap.has(countryName)) {
            newMap.set(countryName, 0);
        }
        this._selectedCountriesAndPercentages = newMap;
    }

    removeSelectedCountry(countryName: CountryName): void {
        if (this._selectedCountriesAndPercentages === undefined) {
            throw Error(
                "SelectedCountriesLocalDataSource._selectedCountriesAndPercentages is undefined"
            );
        }

        const newMap = new Map<CountryName, number>();

        if (newMap.has(countryName)) {
            newMap.delete(countryName);
        }
        this._selectedCountriesAndPercentages = newMap;
    }

    setSelectedCountryPercentage(
        countryName: CountryName,
        percentage: number
    ): void {
        if (this._selectedCountriesAndPercentages === undefined) {
            throw Error(
                "SelectedCountriesLocalDataSource._selectedCountriesAndPercentages is undefined"
            );
        }

        if (this._selectedCountriesAndPercentages.has(countryName)) {
            this._selectedCountriesAndPercentages.set(countryName, percentage);
        } else {
            throw Error(
                "SelectedCountriesLocalDataSource._selectedCountriesAndPercentages does not have countryName"
            );
        }
    }
}
