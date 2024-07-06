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
