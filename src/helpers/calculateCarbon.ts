import { COUNTRIES, CountryName } from "../constants/Countries";

export const calculateCarbon = (transferSize: number, selectedCountries: Map<CountryName, number>): number => {

    let carbon = 0;
    selectedCountries.forEach((percentage, country) => {
        carbon += (transferSize / 1073741824) * COUNTRIES[country] * percentage;
    });
    return carbon;
}