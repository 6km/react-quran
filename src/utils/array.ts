/**
 * Groups an array of objects by a specified key.
 */
export function groupBy<T>(values: T[], key: keyof T): Record<string, T[]> {
    return values.reduce(
        (acc, obj) => {
            const groupKey = obj[key]
            if (groupKey !== null && groupKey !== undefined) {
                const groupKeyString = String(groupKey)
                if (!acc[groupKeyString]) {
                    acc[groupKeyString] = []
                }
                acc[groupKeyString].push(obj)
            }
            return acc
        },
        {} as Record<string, T[]>,
    )
}

/**
 * Deeply check if two values are equal
 */
export function isDeepEqual(value1: any, value2: any): boolean {
    // check if both values are of the same type
    if (typeof value1 !== typeof value2) return false

    // if both values are objects (including arrays), handle them separately
    if (typeof value1 === 'object' && value1 !== null && value2 !== null) {
        // check if both values are arrays
        if (Array.isArray(value1) && Array.isArray(value2)) {
            if (value1.length !== value2.length) return false

            // iterate through the array elements and check equality
            for (let i = 0; i < value1.length; i++) {
                if (!isDeepEqual(value1[i], value2[i])) return false
            }
            return true
        }

        // check if both values are objects (but not arrays)
        if (!Array.isArray(value1) && !Array.isArray(value2)) {
            const keys1 = Object.keys(value1)
            const keys2 = Object.keys(value2)

            if (keys1.length !== keys2.length) return false

            // iterate through the object keys and check equality
            for (const key of keys1) {
                if (!Object.prototype.hasOwnProperty.call(value2, key)) return false
                if (!isDeepEqual(value1[key], value2[key])) return false
            }
            return true
        }
    }

    // for primitive types or non-object types, use strict equality
    return value1 === value2
}

/**
 * Check if the item "x" is in "arr"
 */
export function isSubset(array: any[], subObject: any): boolean {
    if (Array.isArray(array) || subObject != null) {
        if (array.includes(subObject)) return true
    }

    for (let i = 0; i < array.length; i++) {
        if (isDeepEqual(array[i], subObject)) return true
    }

    return false
}
