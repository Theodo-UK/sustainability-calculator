import { getEmissionsComparison } from "../getEmissionComparison";

describe("getEmissionsComparison", () => {
    describe("when emissions are between 0 and 0.2", () => {
        it("should return 0% Google Search when emissions are 0", () => {
            expect(getEmissionsComparison(0)).toBe("0% Google Search");
        });
        it("should return 50% Google Search when emissions are 0.1", () => {
            expect(getEmissionsComparison(0.1)).toBe("50% Google Search");
        });
        it("should return 99% Google Search when emissions are 0.1999", () => {
            expect(getEmissionsComparison(0.1999)).toBe("99% Google Search");
        });
    });
    describe("when emissions are between 0.2 and 21, should return an amount of Google Searches rounded to the nearest half integer", () => {
        it("for 0.2g of CO2", () => {
            expect(getEmissionsComparison(0.2)).toBe("1 Google Search");
        });
        it("for 0.24999g of CO2", () => {
            expect(getEmissionsComparison(0.24999)).toBe("1 Google Search");
        });
        it("for 0.25g of CO2", () => {
            expect(getEmissionsComparison(0.25)).toBe("1.5 Google Search");
        });
        it("for 0.34999g of CO2", () => {
            expect(getEmissionsComparison(0.3)).toBe("1.5 Google Search");
        });
        it("for 21g of CO2", () => {
            expect(getEmissionsComparison(21)).toBe("105 Google Search");
        });
    });
    describe("when emissions are between 21 and 82, should return an amount of Coffee Cups rounded to the nearest half integer", () => {
        it("for 21.001g of CO2", () => {
            expect(getEmissionsComparison(21.001)).toBe("1 Coffee Cup");
        });
        it("for 26.2499g of CO2", () => {
            expect(getEmissionsComparison(26.2499)).toBe("1 Coffee Cup");
        });
        it("for 26.25g of CO2", () => {
            expect(getEmissionsComparison(26.25)).toBe("1.5 Coffee Cup");
        });
        it("for 36.7499g of CO2", () => {
            expect(getEmissionsComparison(36.7499)).toBe("1.5 Coffee Cup");
        });
        it("for 82g of CO2", () => {
            expect(getEmissionsComparison(82)).toBe("4 Coffee Cup");
        });
    });
    describe("when emissions are above 82, should return an amount of Plastic Water Bottles rounded to the nearest half integer", () => {
        it("for 82.001g of CO2", () => {
            expect(getEmissionsComparison(82.001)).toBe(
                "1 Plastic Water Bottle"
            );
        });
        it("for 102.4999g of CO2", () => {
            expect(getEmissionsComparison(102.4999)).toBe(
                "1 Plastic Water Bottle"
            );
        });
        it("for 102.5g of CO2", () => {
            expect(getEmissionsComparison(102.5)).toBe(
                "1.5 Plastic Water Bottle"
            );
        });
        it("for 143.4999g of CO2", () => {
            expect(getEmissionsComparison(143.4999)).toBe(
                "1.5 Plastic Water Bottle"
            );
        });
        it("for 9876543210 of CO2", () => {
            expect(getEmissionsComparison(9876543210)).toBe(
                "120445649 Plastic Water Bottle"
            );
        });
    });
});
