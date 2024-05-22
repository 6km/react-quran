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
