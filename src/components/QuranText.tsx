import styled from 'styled-components'

const Text = styled.span`
    font-family: 'quran-font_react-quran';
    font-weight: normal;
    font-style: normal;
    text-align: right !important;
    white-space: break-spaces;
`

export default function QuranText({ text, className = '' }: { text: string; className?: string }) {
    return <Text className={className}>{text}</Text>
}
