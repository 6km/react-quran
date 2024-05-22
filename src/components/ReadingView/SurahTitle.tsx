import styled from 'styled-components'
import { getChapterName } from '../../utils/chapter'
import React from 'react'

const SurahFrame = styled.div<{ $linesLength: number }>`
    text-align: center;
    border-width: 1px 0;
    border-color: hsl(240 29% 90% / 1);
    border-style: ridge;
    font-size: 5cqi !important;
    font-family: 'quran-font_react-quran';
    line-height: normal;
    height: 10.6cqi;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${props => (props.$linesLength >= 14 ? '1.5cqi 0' : '1.5cqi 0 1.5cqi 0')};
`

export default function SurahTitle({
    surahNumber,
    linesLength,
    surahTitleStyles,
}: {
    surahNumber: number
    linesLength: number
    surahTitleStyles: React.CSSProperties
}) {
    return (
        <SurahFrame className="surah-title" $linesLength={linesLength} style={surahTitleStyles}>
            {'سورة '.concat(getChapterName(surahNumber))}
        </SurahFrame>
    )
}
