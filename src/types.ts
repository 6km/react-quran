import { CSSProperties } from 'react'

export type PageDataType = { [pageIndex: string]: Verse[] }

export interface Verse {
    // Verse number
    v: number
    // Chapter id
    c: number
    // Verse words
    w: Word[]
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
