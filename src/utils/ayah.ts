import pagesData from '../data/pages-v2.json'
import { AyahResult, PageDataType, SearchAyahOptions, Verse } from '../types'
import { getChapterName } from './chapter'
import { isArabicDigits, stringToNumber, stripHarakaat } from './string'

let verseIndex: Map<string, Verse> | null = null

function buildVerseIndex(): Map<string, Verse> {
    if (verseIndex) return verseIndex

    const index = new Map<string, Verse>()
    for (const page of pagesData as PageDataType) {
        for (const verse of page) {
            index.set(verse.d, verse)
        }
    }
    verseIndex = index
    return index
}

function verseToText(verse: Verse): string {
    return verse.w
        .filter(
            ({ uthmani, type }) =>
                type !== 'end' && !isArabicDigits(uthmani),
        )
        .map(({ uthmani }) => uthmani)
        .join(' ')
}

function parseVerseKey(d: string): [number, number] {
    const [surah, ayah] = d.split('_').map(stringToNumber)
    return [surah, ayah]
}

function toAyahResult(verse: Verse): AyahResult {
    const [surah, ayah] = parseVerseKey(verse.d)
    return {
        text: verseToText(verse),
        surah,
        surahName: getChapterName(surah),
        ayah,
        verse,
    }
}

/**
 * Returns a single ayah by surah and ayah number.
 */
export function getAyah(surahNumber: number, ayahNumber: number): AyahResult | null {
    const verse = buildVerseIndex().get(`${surahNumber}_${ayahNumber}`)
    return verse ? toAyahResult(verse) : null
}

/**
 * Returns ayahs whose text includes the given query (substring match).
 * Matching ignores harakaat (e.g. "بسم" matches "بِسۡمِ").
 *
 * Use `limit` and `offset` to paginate (e.g. page 2 with 10 per page: `{ limit: 10, offset: 10 }`).
 */
export function searchAyahByText(
    query: string,
    options?: SearchAyahOptions,
): AyahResult[] {
    const trimmed = query.trim()
    if (!trimmed) return []

    const normalizedQuery = stripHarakaat(trimmed)
    if (!normalizedQuery) return []

    const offset = Math.max(0, options?.offset ?? 0)
    const limit = options?.limit
    if (limit !== undefined && limit <= 0) return []

    const results: AyahResult[] = []
    let skipped = 0
    let done = false

    buildVerseIndex().forEach(verse => {
        if (done) return

        const text = verseToText(verse)
        if (!stripHarakaat(text).includes(normalizedQuery)) return

        if (skipped < offset) {
            skipped++
            return
        }

        results.push(toAyahResult(verse))
        if (limit !== undefined && results.length >= limit) {
            done = true
        }
    })

    return results
}
