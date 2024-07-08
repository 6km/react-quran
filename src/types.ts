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
    words: { text_uthmani: string }[]
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
