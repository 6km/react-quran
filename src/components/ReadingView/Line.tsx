import styled from 'styled-components'
import QuranText from '../QuranText'
import { CENTERED_PAGES_HORIZONTAL, MEDINA_MUSHAF_CENTERED_LINES } from '../../commons/constants'
import { isSubset } from '../../utils/array'

const LineContainer = styled.div<{ $length: number; $center: boolean }>`
    word-break: keep-all !important;
    line-height: 7.6cqi;
    font-size: ${props => (props.$length >= 10 ? '5cqi' : '5.5cqi')};

    width: 100%;
    text-align: ${props => (props.$center ? 'center' : 'justify')};
    display: flex;
    justify-content: ${props => (props.$center ? 'center' : 'space-between')};
    margin-top: 0.5cqi;
    gap: ${props => (props.$center ? '0.6cqi' : '0.02cqi')};
    flex-wrap: nowrap;

    padding: 0px 3px;
    box-sizing: border-box;
    flex: 1;
`

export default function Line({
    page,
    words,
    lineKey,
    surahId,
    lineId,
}: {
    page: number
    lineKey: string
    words: { text_uthmani: string }[]
    surahId: number
    lineId: number
}) {
    const isCenteredInMushafAlMadinah = isSubset(MEDINA_MUSHAF_CENTERED_LINES, [surahId, page, lineId])

    return (
        <LineContainer
            $center={CENTERED_PAGES_HORIZONTAL.includes(page) || isCenteredInMushafAlMadinah}
            $length={words.length}>
            {words.map((word: { text_uthmani: string }, wordIndex) => (
                <QuranText key={`${lineKey}-Word${wordIndex}`} text={word.text_uthmani} />
            ))}
        </LineContainer>
    )
}
