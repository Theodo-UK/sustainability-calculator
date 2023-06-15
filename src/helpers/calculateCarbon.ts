import { LocationType } from "components/LocationDropdown";





export const calculateCarbon = (country: LocationType): number => {
    return country.value;
}