import { Fragment, memo, useMemo } from 'react'
import clipboardCopy from 'clipboard-copy'
import styled from 'styled-components'

import pagesData from '../../data/pages-v2.json'
import { ReadingViewProps, Verse, ViewContainerStyleProps, ViewStyleProps } from '../../types'
import { getLinesByVerses, getValidPageNumber } from '../../utils/page'
import Basmala from '../Basmala'
import Line from './Line'
import SurahTitle from './SurahTitle'
import { CENTERED_PAGES_VERTICAL, SURAH_ATTAWBAH_ID } from '../../commons/constants'
import { isDeepEqual } from '../../utils/array'

const ViewContainer = styled.div<ViewContainerStyleProps>`
    width: 100%;
    container-type: inline-size;
    direction: rtl !important;

    * {
        direction: rtl !important;
    }

    ${({ $fixedAspectRatio, $page }) =>
        $fixedAspectRatio ? 'aspect-ratio: 1/1.32;' : $page <= 2 && 'padding-bottom: 3cqi;'}
`

const View = styled.div<ViewStyleProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: ${props => (props.$center ? 'center' : 'inherit')};
    align-items: stretch;
    padding: 1cqi 0;

    text-align: justify;

    & > .surah-title:first-child {
        // margin-top: 0;
        margin-top: -1cqi !important;
        border-top-width: 0 !important;
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
 * Handles copy text event
 * - remove line break after words. this is an issue on Chrome.
 */
const onQuranTextCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = document.getSelection()

    const quranWordsToCopy = Array.from(document.querySelectorAll(`[data-word]`))
        .filter(node => selection?.containsNode(node, true))
        .map(wordElement => wordElement.innerHTML.trim())
        .join(' ')
    // .replace('&nbsp;', '')

    if (typeof quranWordsToCopy == 'string' && quranWordsToCopy?.length > 0) {
        event.preventDefault()
        clipboardCopy(quranWordsToCopy)
    }
}

/**
 * Renders a page of quran
 */
export const ReadingView = memo(function ReadingView({
    page = 1,
    readingViewStyles = {},
    surahTitleStyles = {},
    fixedAspectRatio = true,
}: ReadingViewProps) {
    const [pageNumber, pageLines] = useMemo(() => {
        const pageNumber = getValidPageNumber(page)
        const pageVerses: Verse[] = pagesData[pageNumber - 1]
        const pageLines = Object.values(getLinesByVerses(pageVerses))

        return [pageNumber, pageLines]
    }, [page])

    const styles = useMemo(() => ({ width: '440px', ...readingViewStyles, overflow: 'visible' }), [readingViewStyles])

    const viewContainerStyleProps = useMemo<ViewContainerStyleProps>(
        () => ({
            $fixedAspectRatio: fixedAspectRatio,
            $page: pageNumber,
        }),
        [fixedAspectRatio, pageNumber],
    )

    const viewStyleProps = useMemo<ViewStyleProps>(
        () => ({
            $center: CENTERED_PAGES_VERTICAL.includes(pageNumber),
        }),
        [pageNumber],
    )

    return (
        <ViewContainer style={styles} {...viewContainerStyleProps}>
            <View onCopy={onQuranTextCopy} {...viewStyleProps}>
                {pageLines.map((words, lineIndex, { length }) => {
                    const { is_start: isStartOfSurah, chapter_id: surahId } = words[0]
                    const isSurahAttawbah = surahId === SURAH_ATTAWBAH_ID
                    const isFirstPage = pageNumber === 1

                    /**
                     * adds basmala if these conditions are met:
                     * - start of the Surah (chapter).
                     * - not the 1st page because it already has basmalah; which is the first ayah (verse).
                     * - the Surah is not Al-Tawbah; explaination:
                     *      - [Shaykh Abdul-Aziz Ibn Baz](https://binbaz.org.sa/fatwas/7171/%D9%85%D8%A7-%D8%B3%D8%A8%D8%A8-%D8%B9%D8%AF%D9%85-%D9%88%D8%AC%D9%88%D8%AF-%D8%A7%D9%84%D8%A8%D8%B3%D9%85%D9%84%D8%A9-%D9%81%D9%8A-%D8%B3%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%AA%D9%88%D8%A8%D8%A9)
                     *      - [Shaykh Othman Alkamees](https://youtu.be/P75vmy6YCzg)
                     */
                    const shouldAddBasmala = isStartOfSurah && !isFirstPage && !isSurahAttawbah

                    const lineNumber = lineIndex + 1

                    return (
                        <Fragment key={`page${page}-line${lineNumber}`}>
                            {isStartOfSurah && (
                                <SurahTitle
                                    linesLength={length}
                                    surahNumber={words[0].chapter_id}
                                    surahTitleStyles={surahTitleStyles}
                                />
                            )}
                            {viewStyleProps.$center && lineNumber === 1 && <FlexDiv />}
                            {shouldAddBasmala && <Basmala height="7cqi" style={{ marginBottom: '1cqi' }} />}
                            <Line page={pageNumber} words={words} surahId={surahId} lineNumber={lineNumber} />
                        </Fragment>
                    )
                })}

                {viewStyleProps.$center && <FlexDiv />}
            </View>
        </ViewContainer>
    )
}, isDeepEqual)
