import styled from 'styled-components'

const Text = styled.span`
    font-family: 'quran-font_react-quran';
    font-weight: normal;
    font-style: normal;
    white-space: nowrap !important;
    text-transform: none !important;
`

export default function QuranText({ text, className = '' }: { text: string; className?: string }) {
    return (
        <Text className={className} data-word="word">
            {text}
            {/* &nbsp; */}
        </Text>
    )
}
