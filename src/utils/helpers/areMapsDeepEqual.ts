export function areMapsDeepEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>) {
    let result = true;
    if (map1.size !== map2.size) {
        return false;
    }
    map1.forEach((val, key) => {
        const testVal = map2.get(key);
        if (testVal !== val || (testVal === undefined && !map2.has(key))) {
            result = false;
            return;
        }
    });
    return result;
}
