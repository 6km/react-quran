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
 * Deeply check if two arrays are equal
 */
export function isDeepEqual(array1: any[], array2: any[]) {
    if (array1.length !== array2.length) return false

    // both of the items are arrays.
    // both of the arrays are empty.
    // so they're equal.
    if (Array.isArray(array1) && Array.isArray(array2) && [array1.length, array2.length].every(n => n == 0)) return true

    // iterate through all of the elements and check if they're equal
    for (let i = 0; i < array1.length; i++) {
        const element1 = array1[i]
        const element2 = array2[i]

        // types of the elements are not equal.
        // so they're not equal.
        if (typeof element1 !== typeof element2) return false

        // the element in array1 is an array/object.
        // so check if it matches the same element in array2.
        if (typeof element1 === 'object' && !isDeepEqual(element1, element2)) return false

        // both of the elements are not equal
        if (element1 !== element2) return false
    }

    return true
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
