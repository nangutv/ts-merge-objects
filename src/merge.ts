type Obj = Record<string, any>

const isObject = (x: unknown) => {
    return typeof x === 'object' && !Array.isArray(x) && x !== null
}

export const merge = (source: Obj, target: Obj) => {
    if (!isObject(source) || !isObject(target)) {
        throw new Error('Wrong arguments - they are not objects')
    }

    const result = {
        ...source,
        ...target,
    }

    Object.keys(source).forEach(key => {
        const sourceValue = source[key]
        const targetValue = target[key]

        // merge colliding attributes if they are objects
        if (isObject(sourceValue) && isObject(targetValue)) {
            result[key] = merge(sourceValue, targetValue)
        }
    })

    return result
}
