import styled from 'styled-components'
import { getChapterName } from '../../utils/chapter'
import React from 'react'

const SurahFrame = styled.div<{ $linesLength: number }>`
    // background-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20248.91%2027.82'%3e%3cg%20id='e929a7f5-87d2-4ce0-a812-51cb31c518e2'%20data-name='Layer%202'%3e%3cg%20id='ec8e3ce1-e60e-44ba-b0ee-15e07f04cfdc'%20data-name='Layer%201'%3e%3cpath%20d='M0,27.82H248.91V0H0ZM162.27,2.05a2.8,2.8,0,0,1,1.47.56,5.49,5.49,0,0,1,1.88,2.94l0,0h0a5.73,5.73,0,0,1,2.07-1.19,2.66,2.66,0,0,1,.72-.1,2.29,2.29,0,0,1,.87.17,3.84,3.84,0,0,1,1.29.92,16.23,16.23,0,0,1,1.16,1.38h0a10.59,10.59,0,0,0,2,2.14,3.37,3.37,0,0,0,2,.68,3.65,3.65,0,0,0,.72-.07l.09,0,0,.08a10.71,10.71,0,0,0,4.27,3.8l.1,0,0,.1a2.31,2.31,0,0,0,0,.37,2.42,2.42,0,0,0,0,.47l0,.11-.1,0a10.67,10.67,0,0,0-4.29,3.81l0,.08-.09,0a3.65,3.65,0,0,0-.72-.07,3.44,3.44,0,0,0-2,.68,10.58,10.58,0,0,0-2,2.14c-.61.78,0,0,0,0a16.23,16.23,0,0,1-1.16,1.38,3.84,3.84,0,0,1-1.29.92,2.29,2.29,0,0,1-.87.17,2.66,2.66,0,0,1-.72-.1,5.88,5.88,0,0,1-2.07-1.19h0l0,0a5.61,5.61,0,0,1-1.88,2.94,2.86,2.86,0,0,1-1.47.56l-.9,0H87.53c-.39,0-.73,0-.9,0a2.86,2.86,0,0,1-1.48-.56,5.55,5.55,0,0,1-1.88-2.94l0,0h0a5.73,5.73,0,0,1-2.07,1.19,2.66,2.66,0,0,1-.72.1,2.29,2.29,0,0,1-.87-.17,3.84,3.84,0,0,1-1.29-.92,16.23,16.23,0,0,1-1.16-1.38,0,0,0,0,0,0,0,10.65,10.65,0,0,0-2-2.15,3.37,3.37,0,0,0-2-.68,3.65,3.65,0,0,0-.72.07l-.09,0,0-.08a10.67,10.67,0,0,0-4.29-3.81l-.1,0,0-.11a2.42,2.42,0,0,0,.05-.47,2.22,2.22,0,0,0,0-.37l0-.1.1,0a10.71,10.71,0,0,0,4.27-3.8l0-.08.09,0a3.65,3.65,0,0,0,.72.07,3.44,3.44,0,0,0,2-.68,10.58,10.58,0,0,0,2-2.14c.61-.78,0,0,0,0a16.23,16.23,0,0,1,1.16-1.38,3.84,3.84,0,0,1,1.29-.92,2.29,2.29,0,0,1,.87-.17,2.66,2.66,0,0,1,.72.1,5.88,5.88,0,0,1,2.07,1.19h0s0,0,0,0A5.61,5.61,0,0,1,85.15,2.6,2.86,2.86,0,0,1,86.62,2l.9,0h73.85l.9,0Z'%20style='fill:%23fff;fill-rule:evenodd;opacity:0.2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e") no-repeat center cover;

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
