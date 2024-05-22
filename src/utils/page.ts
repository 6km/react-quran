import { Verse } from '../types'
import { groupBy } from './array'

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
 * { [lineNumber]: [words of the line] }
 */
export function getLinesByVerses(verses: Verse[]) {
    const mergedWords = verses.flatMap(({ w: words, v: verse_number, c: chapter_id }) => [
        ...words.map((w, index) => {
            return {
                ...w,
                chapter_id,
                verse_number,
                is_start: verse_number === 1 && index === 0,
            }
        }),
    ])

    return groupBy(mergedWords, 'line')
}
