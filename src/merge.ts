type Obj = Record<string, any>

const isObject = (x: unknown) => {
    return typeof x === 'object' && !Array.isArray(x) && x !== null
}

const mergeTwo = (source: Obj, target: Obj) => {
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
            result[key] = mergeTwo(sourceValue, targetValue)
        }
    })

    return result
}

export const merge = (...args: Obj[]) => {
    if (args.length === 0) {
        return null
    }

    if (args.length === 1) {
        return args[0]
    }

    return args.reduce((acc, next) => mergeTwo(acc, next), {})
}
