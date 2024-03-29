import { CalculationData } from "../../../data/calculations/CalculationData";
import {
    calculationDataArrayToJSON,
    JSONtoCalculationDataArray,
    JSONtoMap,
    maptoJSON,
} from "../jsonHelpers";

describe("jsonHelpers", () => {
    describe("maptoJSON", () => {
        it("should serialize a map with one key-value pair to a JSON string", () => {
            const map = new Map([["United States", 1]]);
            const jsonString = maptoJSON(map);
            expect(jsonString).toEqual('{"United States":1}');
        });
    });

    describe("JSONtoMap", () => {
        it("should deserialize a JSON string with one key-value pair to a map", () => {
            const jsonString = '{"United States":1}';
            const map = JSONtoMap<string, number>(jsonString);
            expect(map.get("United States")).toEqual(1);
        });
    });

    it("should convert CalculationData array to JSON and back", () => {
        const calculationDataArray = [
            new CalculationData(
                1,
                new Map([["United States", 1]]),
                new Map([]),
                1,
                1,
                "new user"
            ),
            new CalculationData(
                2,
                new Map([["United States", 2]]),
                new Map([]),
                2,
                2,
                "returning user"
            ),
        ];
        const humanReadableJson =
            '["{\\"bytes\\":1,\\"selectedCountries\\":\\"{\\\\\\"United States\\\\\\":1}\\",\\"selectedDevices\\":\\"{}\\",\\"startUnixTimeMs\\":1,\\"endUnixTimeMs\\":1,\\"userType\\":\\"new user\\"}","{\\"bytes\\":2,\\"selectedCountries\\":\\"{\\\\\\"United States\\\\\\":2}\\",\\"selectedDevices\\":\\"{}\\",\\"startUnixTimeMs\\":2,\\"endUnixTimeMs\\":2,\\"userType\\":\\"returning user\\"}"]';

        const json = calculationDataArrayToJSON(calculationDataArray);
        expect(json).toEqual(humanReadableJson);
        const result = JSONtoCalculationDataArray(json);
        expect(result).toEqual(calculationDataArray);
    });
});
