import { CountryName, Countries } from "../constants/Countries";

export const calculateCarbon = (country: CountryName): number => {
    return Countries[country];
}