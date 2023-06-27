import { CountryName } from "../../constants/Countries";
import { SelectedCountriesRepository } from "./SelectedCountriesRepository";

export abstract class ISelectedCountriesRepository {
    private static _instance: ISelectedCountriesRepository;
    static get instance(): ISelectedCountriesRepository {
        this._instance = new SelectedCountriesRepository();
        return this._instance;
    }

    abstract getSelectedCountriesAndPercentages(): Promise<
        Map<CountryName, number>
    >;

    abstract addSelectedCountry(countryName: CountryName): Promise<void>;

    abstract removeSelectedCountry(countryName: CountryName): Promise<void>;

    abstract setSelectedCountryPercentage(
        countryName: CountryName,
        percentage: number
    ): Promise<void>;
}
