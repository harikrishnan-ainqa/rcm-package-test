
export function objectValueFinder(theme, key) {
    if (!theme || !key) return null;
    try {
        const json = JSON.parse(theme);
        const keys = key.split(" ");
        const lastKey = keys.pop();
        const lastObj = keys.reduce((json, key) => {
            return (json[key] = json[key] ?? {});
        }, json);
        console.log(lastObj, "lastObj");
        if (lastObj[lastKey]) {
            return lastObj[lastKey]
        } else {
            return undefined
        }
    } catch (e) {
        console.log('invalid json');
        return undefined
    }
}