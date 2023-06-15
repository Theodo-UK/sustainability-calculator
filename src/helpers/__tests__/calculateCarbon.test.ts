import { calculateCarbon } from "../calculateCarbon"

const mockCountry = 'Australia'

describe('calculateCarbon', () => {
    it('country should return corresponding value', () => {
        expect(calculateCarbon(mockCountry)).toEqual(760)
    })
})