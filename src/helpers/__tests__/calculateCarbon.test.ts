import { CountryName } from "../../constants/Countries"
import { calculateCarbon } from "../calculateCarbon"

const mockCountries: Map<CountryName, number> = new Map([
    ["Australia", 0]
]);

describe('calculateCarbon', () => {
    it('country should return corresponding value', () => {
        expect(calculateCarbon(mockCountries)).toEqual(0)
    })
})