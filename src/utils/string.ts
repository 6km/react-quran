/**
 * Turns a string into a number
 */
export function stringToNumber(string: string | number): number {
    if (typeof string === 'number') return string

    return Number(String(string))
}

const arabicDigitsRegex = /^[\u0660-\u0669]+$/

/**
 * Check if a string an arabic digit
 * @returns
 */
export function isArabicDigits(string: string) {
    if (typeof string !== 'string') return

    return arabicDigitsRegex.test(string)
}
