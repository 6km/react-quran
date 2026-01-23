import { useMemo } from 'react';
import styled from 'styled-components'

const Text = styled.span`
    font-family: 'quran-font_react-quran';
    font-weight: normal;
    font-style: normal;
    white-space: nowrap !important;
    text-transform: none !important;

    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
`

export default function QuranText({ text, className = '', data }: { text: string; className?: string, data: { chapter: number, verse: number } }) {
    const dataset = useMemo(() => Object.fromEntries(Object.entries(data).map(([key, value]) => ['data-' + key, value])), [data])

    return (
        <Text className={className} data-word="word" {...dataset}>
            {text}
            {/* &nbsp; */}
        </Text>
    )
}
