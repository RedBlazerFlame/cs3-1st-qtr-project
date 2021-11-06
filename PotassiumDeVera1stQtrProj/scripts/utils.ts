// This function will convert a JavaScript object into a map
function objectToMap<V>(obj: { [key: string]: V }): Map<string, V> {
    let keyValuePairs: [string, V][] = [];
    for (const key in obj) {
        keyValuePairs.push([key, obj[key]]);
    }

    return new Map(keyValuePairs);
}
