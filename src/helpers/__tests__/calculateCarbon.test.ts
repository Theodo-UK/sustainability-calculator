import { CountryName } from "../../constants/Countries"
import { calculateCarbon } from "../calculateCarbon"

const mockCountries : Set<CountryName> = new Set();
mockCountries.add("Australia");

describe('calculateCarbon', () => {
    it('country should return corresponding value', () => {
        expect(calculateCarbon(mockCountries)).toEqual(0)
    })
})