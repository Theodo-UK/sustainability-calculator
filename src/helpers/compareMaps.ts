export function compareMaps(map1: Map<any, any>, map2: Map<any, any>) {
    let result = true;
    if (map1.size !== map2.size) {
        return false;
    }
    map1.forEach((val, key) => {
        console.log(key, val)
        let testVal = map2.get(key);
        console.log(key, testVal)
        // in cases of an undefined value, make sure the key
        // actually exists on the object so there are no false positives
        if (testVal !== val || (testVal === undefined && !map2.has(key))) {
            result = false;
            return 
        }
    });
    return result;
}
