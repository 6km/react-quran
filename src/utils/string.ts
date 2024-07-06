/**
 * Turns a string into a number
 */
export function stringToNumber(string: string | number): number {
    if (typeof string === 'number') return string

    return Number(String(string))
}
