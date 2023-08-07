import { CalculationData } from "../../data/calculations/CalculationData";

export const maptoJSON = <K, V>(map: Map<K, V>): string => {
    try {
        return JSON.stringify(Object.fromEntries(map));
    } catch (error: unknown) {
        throw new Error(`Error in maptoJSON: ${error}\n${map}`);
    }
};

export const JSONtoMap = <K, V>(jsonStr: string): Map<K, V> => {
    try {
        return new Map<K, V>(
            Object.entries(JSON.parse(jsonStr)) as Array<[K, V]>
        );
    } catch (error: unknown) {
        throw new Error(`Error in JSONtoMap: ${error}\n${jsonStr}`);
    }
};

export function calculationDataArrayToJSON(
    calculationDataArray: CalculationData[]
): string {
    try {
        return JSON.stringify(
            calculationDataArray.map((calculationData) =>
                calculationData.toJSON()
            )
        );
    } catch (error: unknown) {
        throw new Error(
            `Error in calculationDataArrayToJSON: ${error}\n${calculationDataArray}`
        );
    }
}

export function JSONtoCalculationDataArray(json: string): CalculationData[] {
    try {
        return JSON.parse(json).map((jsonStr: string) =>
            CalculationData.fromJSON(jsonStr)
        );
    } catch (error: unknown) {
        throw new Error(
            `Error in JSONtoCalculationDataArray: ${error}\n${json}`
        );
    }
}
