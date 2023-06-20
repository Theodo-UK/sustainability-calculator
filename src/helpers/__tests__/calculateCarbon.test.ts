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
// "United Kingdom" : 212.3,
//     "Austria" : 111.2,
//     "Belgium" : 161.9,
//     "Bulgaria" : 372.1,
//     "Croatia" : 227,


const mockSmallTransferSize = 50 
const mockLargeTransferSize = 500000 

describe('calculateCarbon', () => {
    it('country should return corresponding value', () => {
        expect(calculateCarbon(mockSmallTransferSize, mockCountry)).toBeCloseTo(0.000017695)
    })

    it('multiple countries should return corresponding carbon consumption for a given transfer size', () => {
        expect(calculateCarbon(mockLargeTransferSize, mockCountries)).toBeCloseTo(0.16074)
    })
})