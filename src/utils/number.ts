/**
 * Turns a number into a string
 */
export function numberToString(number: string | number): string {
    if (typeof number === 'string') return number

    return String(Number(number))
}

/**
 * Convert English numbers to Arabic numbers
 */
export default function toArabicNumeral(en: number | string) {
    return ('' + en).replace(/[0-9]/g, function (t) {
        return '٠١٢٣٤٥٦٧٨٩'.slice(+t, +t + 1)
    })
}
