function objectToMap(obj) {
    let keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push([key, obj[key]]);
    }
    return new Map(keyValuePairs);
}
