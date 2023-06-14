import { LocationType } from "components/LocationDropdown";
import { LOCATIONS } from "constants/locations";




export const calculateCarbon = (country: LocationType): number => {
    return country.value;
}