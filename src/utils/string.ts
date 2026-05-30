/**
 * Turns a string into a number
 */
export function stringToNumber(string: string | number): number {
    if (typeof string === 'number') return string

    return Number(String(string))
}

function isHarakaatOrMark(codePoint: number): boolean {
    if (codePoint >= 0x064b && codePoint <= 0x065f) return true
    if (codePoint === 0x0640 || codePoint === 0x0670) return true
    if (codePoint >= 0x06d6 && codePoint <= 0x06ed) return true
    return false
}

/**
 * Removes harakaat and related marks for harakaat-insensitive search.
 */
export function stripHarakaat(text: string): string {
    let result = ''
    for (const char of text) {
        const codePoint = char.codePointAt(0)
        if (codePoint !== undefined && !isHarakaatOrMark(codePoint)) {
            result += char
        }
    }
    return result
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
