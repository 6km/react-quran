import { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import _pagesData from '../../data/pages.json'
import { PageDataType, ReadingViewProps, Verse } from '../../types'
import { numberToString } from '../../utils/number'
import { getLinesByVerses, getValidPageNumber } from '../../utils/page'
import Basmala from './Basmala'
import Line from './Line'
import SurahTitle from './SurahTitle'

const pagesData = _pagesData as PageDataType

const ViewContainer = styled.div<{ $fixedAspectRatio: boolean; $page: number }>`
    width: 100%;
    ${props => (props.$fixedAspectRatio ? 'aspect-ratio: 1/1.32;' : props.$page <= 2 ? 'padding-bottom: 3cqi;' : '')}
    container-type: inline-size;
    direction: rtl;
`

const View = styled.div<{ $center: boolean }>`
    width: 100%;
    height: 100%;
    text-align: justify;
    display: flex;
    flex-direction: column;
    justify-content: ${props => (props.$center ? 'center' : 'inherit')};

    & > .surah-title:first-child {
        margin-top: 0;
        border-top-width: 0;
    }
`

/**
 * Used to center surah in the first 2 pages of the mushaf
 */
const FlexDiv = styled.div`
    flex: 1;
    flex-grow: 3;
`

/**
 * Renders a page of quran
 */
export function ReadingView({
    page = 1,
    readingViewStyles = {},
    surahTitleStyles = {},
    fixedAspectRatio = true,
}: ReadingViewProps) {
    const [pageNumber, pageLines] = useMemo(() => {
        const pageNumber = getValidPageNumber(page)
        const pageVerses: Verse[] = pagesData[numberToString(pageNumber)]
        const pageLines = getLinesByVerses(pageVerses)

        return [pageNumber, pageLines]
    }, [page])

    const shouldCenter = pageNumber <= 2
    const styles = useMemo(() => ({ width: '440px', ...readingViewStyles }), [readingViewStyles])

    return (
        <ViewContainer style={styles} $fixedAspectRatio={fixedAspectRatio} $page={pageNumber}>
            <View $center={shouldCenter}>
                {Object.values(pageLines).map((words, lineIndex, { length }) => {
                    const isStartOfSurah = words[0].is_start

                    /**
                     * adds basmala if these conditions are met:
                     * - start of the Surah (chapter).
                     * - not the 1st page because it already has basmalah; which is the first ayah (verse).
                     * - the Surah is not Al-Tawbah; explaination:
                     *      - [Shaykh Abdul-Aziz Ibn Baz](https://binbaz.org.sa/fatwas/7171/%D9%85%D8%A7-%D8%B3%D8%A8%D8%A8-%D8%B9%D8%AF%D9%85-%D9%88%D8%AC%D9%88%D8%AF-%D8%A7%D9%84%D8%A8%D8%B3%D9%85%D9%84%D8%A9-%D9%81%D9%8A-%D8%B3%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%AA%D9%88%D8%A8%D8%A9)
                     *      - [Shaykh Othman Alkamees](https://youtu.be/P75vmy6YCzg)
                     */
                    const shouldAddBasmala = isStartOfSurah && pageNumber >= 2 && words[0].chapter_id !== 9

                    return (
                        <Fragment key={`Page${page}-Line${lineIndex}`}>
                            {isStartOfSurah && (
                                <SurahTitle
                                    linesLength={length}
                                    surahNumber={words[0].chapter_id}
                                    surahTitleStyles={surahTitleStyles}
                                />
                            )}
                            {shouldCenter && lineIndex === 0 && words[0].chapter_id <= 2 && <FlexDiv />}
                            {shouldAddBasmala && <Basmala />}
                            <Line page={pageNumber} words={words} lineKey={`Page${page}-AyahLine${lineIndex} `} />
                        </Fragment>
                    )
                })}

                {shouldCenter && <FlexDiv />}
            </View>
        </ViewContainer>
    )
}
