import { JSONtoMap, maptoJSON } from "../jsonHelpers";

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
});
