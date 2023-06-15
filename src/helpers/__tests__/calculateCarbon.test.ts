
import { Country } from "../../constants/country"
import { calculateCarbon } from "../calculateCarbon"

const mockLocation = {
    country: Country['Australia'],
    value: 1.08,
}

describe('calculateCarbon', () => {
    it('country should return corresponding value', () => {
        expect(calculateCarbon(mockLocation)).toEqual(1.08)
    })
})