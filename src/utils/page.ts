import { Verse } from '../types'
import { groupBy, mergeProperty } from './array'

const PAGES_COUNT = 604

/**
 * Convert a page number into a string and ensure it's a valid page number.
 */
export function getValidPageNumber(number: number | string = 1) {
    const page = parseInt(String(number))
    return Math.max(1, Math.min(PAGES_COUNT, page || 1))
}

/**
 * Convert an array of verses to an object of lines
 * [Verses]
 * to
 * { [lineNumber]: [Verses of the line] }
 */
export function getLinesByVerses(verses: Verse[]) {
    const newVerses = verses.map(({ words, ...verse }) => ({
        ...verse,
        words: words.map((w, index) => ({
            ...w,
            ...verse,
            is_start: verse.verse_number === 1 && index === 0,
        })),
    }))

    const mergedWords = mergeProperty(newVerses, 'words')

    return groupBy(mergedWords, 'line')
}
