import styled from 'styled-components'
import QuranText from '../QuranText'
import { CENTERED_PAGES_HORIZONTAL, MEDINA_MUSHAF_CENTERED_LINES } from '../../commons/constants'
import { isSubset } from '../../utils/array'
import { LineContainerStyleProps, LineProps } from '../../types'
import { useMemo } from 'react'

const LineContainer = styled.div<LineContainerStyleProps>`
    word-break: keep-all !important;
    line-height: 7.6cqi;
    font-size: ${props => (props.$length >= 10 ? '5cqi' : '5.5cqi')};
    text-align: ${props => (props.$center ? 'center' : 'justify')};

    width: 100%;
    display: flex;
    justify-content: ${props => (props.$center ? 'center' : 'space-between')};
    margin-top: 0.5cqi;
    gap: ${props => (props.$center ? '0.6cqi' : '0.02cqi')};
    flex-wrap: nowrap;
    padding: 0px 3px;
    box-sizing: border-box;
    flex: 1;
`

export default function Line({ page, words, lineKey, surahId, lineId }: LineProps) {
    const isCenteredInMushafAlMadinah = useMemo(
        () => isSubset(MEDINA_MUSHAF_CENTERED_LINES, [surahId, page, lineId]),
        [surahId, page, lineId],
    )

    const lineContainerStyleProps = useMemo<LineContainerStyleProps>(
        () => ({
            $center: CENTERED_PAGES_HORIZONTAL.includes(page) || isCenteredInMushafAlMadinah,
            $length: words.length,
        }),
        [isCenteredInMushafAlMadinah, page, words.length],
    )

    return (
        <LineContainer {...lineContainerStyleProps}>
            {words.map((word: { text_uthmani: string }, wordIndex) => (
                <QuranText key={`${lineKey}-Word${wordIndex}`} text={word.text_uthmani} />
            ))}
        </LineContainer>
    )
}
