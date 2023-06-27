export const maptoJSON = (map: Map<any, any>): string => {
    return JSON.stringify(Object.fromEntries(map));
}

export const JSONtoMap = (jsonStr: string): Map<any, any> => {
    return new Map(Object.entries(JSON.parse(jsonStr)));
}