import { CalculationData } from "../../data/calculations/ICalculationsRepository";

export const maptoJSON = <K, V>(map: Map<K, V>): string => {
    return JSON.stringify(Object.fromEntries(map));
};

export const JSONtoMap = <K, V>(jsonStr: string): Map<K, V> => {
    return new Map<K, V>(Object.entries(JSON.parse(jsonStr)) as Array<[K, V]>);
};

export function calculationDataArrayToJSON(
    calculationDataArray: CalculationData[]
): string {
    return JSON.stringify(
        calculationDataArray.map((calculationData) => calculationData.toJSON())
    );
}

export function JSONtoCalculationDataArray(json: string): CalculationData[] {
    return JSON.parse(json).map((jsonStr: string) =>
        CalculationData.fromJSON(jsonStr)
    );
}
