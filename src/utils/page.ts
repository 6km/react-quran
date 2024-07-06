import { HAFS_PAGES_COUNT } from '../commons/constants'
import { ProcessedWord, Verse } from '../types'
import { groupBy } from './array'
import { stringToNumber } from './string'

/**
 * Convert a page number into a string and ensure it's a valid page number.
 */
export function getValidPageNumber(number: number | string = 1) {
    const page = parseInt(String(number))
    return Math.max(1, Math.min(HAFS_PAGES_COUNT, page || 1))
}

/**
 * Convert an array of verses to an object of lines
 * [Verses]
 * to
 * { [lineNumber]: [words of the line] }
 */
export function getLinesByVerses(verses: Verse[]) {
    const mergedWords: ProcessedWord[] = verses.flatMap(({ w: words, d: verse_data }) => {
        const [chapter_id, verse_number] = verse_data.split('_').map(stringToNumber)

        return [
            ...words.map(({ uthmani: text_uthmani, line, type }, index) => {
                return {
                    chapter_id,
                    verse_number,
                    is_start: verse_number === 1 && index === 0,
                    text_uthmani,
                    line,
                    type: type || 'word',
                }
            }),
        ]
    })

    return groupBy(mergedWords, 'line')
}
