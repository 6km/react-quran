import { memo, useMemo } from 'react'
import clipboardCopy from 'clipboard-copy'
import styled from 'styled-components'

import QuranText from './QuranText'
import { AyahViewProps } from '../types'
import { getAyah } from '../utils/ayah'
import { getProcessedWordsFromVerse } from '../utils/page'
import { isArabicDigits } from '../utils/string'
import { isDeepEqual } from '../utils/array'

const AyahContainer = styled.div`
    word-break: keep-all !important;
    line-height: 1.6;
    font-size: 1.1em;
    direction: rtl;
    text-align: right;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.15em;
    font-family: 'quran-font_react-quran', serif;
`

/**
 * Handles copy text event – copies selected Quran words as space-separated text.
 */
const onQuranTextCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = document.getSelection()
    const quranWordsToCopy = Array.from(document.querySelectorAll(`[data-word]`))
        .filter(node => selection?.containsNode(node, true))
        .map(wordElement => wordElement.innerHTML.trim())
        .join(' ')

    if (typeof quranWordsToCopy === 'string' && quranWordsToCopy.length > 0) {
        event.preventDefault()
        clipboardCopy(quranWordsToCopy)
    }
}

/**
 * Renders a single ayah (verse) using the same font and word styling as ReadingView.
 */
const AyahView = memo(function AyahView({ surah, ayah, style = {}, className = '' }: AyahViewProps) {
    const words = useMemo(() => {
        const result = getAyah(surah, ayah)
        return result ? getProcessedWordsFromVerse(result.verse) : []
    }, [surah, ayah])

    if (words.length === 0) {
        return null
    }

    return (
        <AyahContainer
            className={className}
            style={style}
            onCopy={onQuranTextCopy}
            dir="rtl"
        >
            {words.map((word, wordIndex) => {
                const isAyahMarker = isArabicDigits(word.text_uthmani)
                const charClass = isAyahMarker ? `react-quran_ayah-marker` : 'react-quran_ayah-word'

                return (
                    <QuranText
                        className={charClass}
                        key={`ayah-word-${wordIndex}`}
                        text={word.text_uthmani}
                        data={{
                            chapter: word.chapter_id,
                            verse: word.verse_number,
                        }}
                    />
                )
            })}
        </AyahContainer>
    )
}, isDeepEqual)

export default AyahView
