export function areMapsDeepEqual(map1: Map<any, any>, map2: Map<any, any>) {
    let result = true;
    if (map1.size !== map2.size) {
        return false;
    }
    map1.forEach((val, key) => {
        const testVal = map2.get(key);
        if (testVal !== val || (testVal === undefined && !map2.has(key))) {
            result = false;
            return 
        }
    });
    return result;
}
