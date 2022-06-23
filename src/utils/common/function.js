
export function objectValueFinder(theme, key) {
    if (!theme || !key) return null;
    const keys = key.split(" ");
    const lastKey = keys.pop();
    const lastObj = keys.reduce((theme, key) => {
        return (theme[key] = theme[key] ?? {});
    }, theme);
    if (lastObj[lastKey]) {
        return lastObj[lastKey]
    } else {
        return null
    }
}