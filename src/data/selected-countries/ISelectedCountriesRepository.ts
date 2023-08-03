import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH,
    CountryName,
} from "../constants/CountryEmissions";
import { SelectedCountriesRepository } from "./SelectedCountriesRepository";
import { TestSelectedCountriesRepository } from "./TestSelectedCountriesRepository";

export abstract class ISelectedCountriesRepository {
    private static _instance: ISelectedCountriesRepository;
    static get instance(): ISelectedCountriesRepository {
        if (!this._instance) {
            switch (process.env.ENV) {
                case "development":
                    this._instance = new SelectedCountriesRepository();
                    break;
                case "test":
                    this._instance = new TestSelectedCountriesRepository();
                    break;
                default:
                    throw new Error(`Unknown environment: ${process.env.ENV}`);
            }
        }
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

const countryNames = Object.keys(
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH
) as CountryName[];

export const isSelectedCountriesMap = (
    data: unknown
): data is Map<CountryName, number> => {
    if (!(data instanceof Map)) {
        return false;
    }

    const keys = Array.from(data.keys());
    const values = Array.from(data.values());

    if (
        keys.some((key) => !countryNames.includes(key)) ||
        values.some((value) => typeof value !== "number")
    ) {
        return false;
    }

    return true;
};
