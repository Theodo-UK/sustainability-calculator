import { CountryName } from "../../constants/Countries"
import { calculateCarbon } from "../calculateCarbon"

const mockCountry: Map<CountryName, number> = new Map([
    ["Australia", 0.5]
]);

const mockCountries: Map<CountryName, number> = new Map([
    ["Australia", 0.2],
    ["United Kingdom", 0.3],
    ["Belgium", 0.2],
    ["Bulgaria", 0.2],
    ["Croatia", 0.1],
]);

const mockSmallBytes = 50 
const mockLargeBytes = 500000 

describe('calculateCarbon', () => {
    it('country should return corresponding value', () => {
        expect(calculateCarbon(mockSmallBytes, mockCountry)).toBeCloseTo(0.000017695)
    })

    it('multiple countries should return corresponding carbon consumption for a given transfer size', () => {
        expect(calculateCarbon(mockLargeBytes, mockCountries)).toBeCloseTo(0.16074)
    })
})