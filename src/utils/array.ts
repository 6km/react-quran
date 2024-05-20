/**
 * Groups an array of objects by a specified key.
 */
export function groupBy<T>(values: T[], key: keyof T): Record<string, T[]> {
    return values.reduce(
        (acc, obj) => {
            const groupKey = obj[key]
            acc[String(groupKey)] = [...(acc[String(groupKey)] || []), obj]
            return acc
        },
        {} as Record<string, T[]>,
    )
}

/**
 * Merges the values of a specified property
 * from an array of objects into a single array.
 */
export function mergeProperty(values: object[], keyFinder: string) {
    const key = keyFinder

    return values.flatMap((v: { [key: string]: any }) => v[key])
}
