export const maptoJSON = <K, V>(map: Map<K, V>): string => {
    return JSON.stringify(Object.fromEntries(map));
};

export const JSONtoMap = <K, V>(jsonStr: string): Map<K, V> => {
    return new Map<K, V>(Object.entries(JSON.parse(jsonStr)) as Array<[K, V]>);
};
