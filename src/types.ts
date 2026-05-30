import { CSSProperties } from 'react'

export type PageDataType = Verse[][]

export interface Verse {
    // Verse extra data; CHAPTER_VERSE (for example, 104_1)
    d: string
    // Verse words
    w: PureWord[]
}
export type PureWord = {
    uthmani: string
    type?: 'word' | 'end' | string
    line: number
}

export type Word = {
    text_uthmani: string
    type: 'word' | 'end' | string
    line: number
}

export type ProcessedWord = Word & {
    verse_number: number
    chapter_id: number
    is_start: boolean
}

export type ReadingViewProps = {
    page?: number | string

    /**
     * ReadingView styles.
     *
     * The default `width` is 50%
     */
    readingViewStyles?: CSSProperties

    /**
     * Surah title styles
     */
    surahTitleStyles?: CSSProperties

    /**
     * Whether the ReadingView should have a fixed aspect ration
     * @default true
     */
    fixedAspectRatio?: boolean
}

export type LineProps = {
    page: number
    words: ProcessedWord[]
    surahId: number
    lineNumber: number
}

/**
 *
 * Styled components props.
 * They are mostly used to implement conditional styles.
 *
 */
export type ViewContainerStyleProps = {
    $fixedAspectRatio: boolean
    $page: number
}
export type ViewStyleProps = {
    $center: boolean
}
export type LineContainerStyleProps = {
    $length: number
    $center: boolean
}

export type AyahViewProps = {
    /** A single verse (ayah) with `d` (e.g. "104_1") and `w` (words) */
    verse: Verse
    /** Optional container styles */
    style?: CSSProperties
    /** Optional className for the root element */
    className?: string
}

export type AyahResult = {
    /** Full ayah text (words joined, end marker excluded) */
    text: string
    /** Surah number (1–114) */
    surah: number
    /** Arabic surah name from surah.json */
    surahName: string
    /** Ayah number within the surah */
    ayah: number
    /** Raw verse for AyahView or further use */
    verse: Verse
}

export type SearchAyahOptions = {
    /** Max number of results to return */
    limit?: number
    /** Number of matching ayahs to skip (for pagination) */
    offset?: number
}
