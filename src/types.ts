import { CSSProperties } from 'react'

export type PageDataType = { [pageIndex: string]: Verse[] }

export interface Verse {
    verse_number: number
    chapter_id: number
    words: Word[]
}

export type Word = {
    text_uthmani: string
    type: 'word' | 'end' | string
    line: number

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
