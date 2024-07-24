import { writeFile } from 'fs'
import old_data from '../src/data/pages-v2.json' with { type: 'json' }
import path from 'path'

/* const groupWordsByLine = pages => {
    return pages.map(page => {
        const groupedLines = {}

        page.forEach(verse => {
            verse.w.forEach(({ line, ...word_data_without_line }) => {
                if (!groupedLines[line]) {
                    groupedLines[line] = []
                }

                groupedLines[line].push(word_data_without_line)
            })
        })

        return Object.entries(groupedLines).map(([line, words]) => ({
            line: Number(line),
            words,
        }))
    })
} */

/* const groupWordsByLine = pages => {
    return pages.map(page => {
        const groupedLines = {}

        page.forEach(verse => {
            verse.w.forEach(word => {
                const { line, ...wordWithoutLine } = word
                if (!groupedLines[line]) {
                    groupedLines[line] = []
                }
                groupedLines[line].push(wordWithoutLine)
            })
        })

        return groupedLines
    })
} */

const groupWordsByLine = pages => {
    return pages.map(page => {
        const groupedLines = {}

        page.forEach(verse => {
            verse.w.forEach(word => {
                const { line, ...wordWithoutLine } = word
                if (!groupedLines[line]) {
                    groupedLines[line] = { words: [], d: verse.d }
                }
                groupedLines[line].words.push(wordWithoutLine)
            })
        })

        return groupedLines
    })
}

const groupedData = groupWordsByLine(old_data)

const new_json_data = JSON.stringify(groupedData)

writeFile(
    path.resolve('./src/data/pages-v3.json'),
    new_json_data,
    {
        encoding: 'utf8',
    },
    err => {
        if (err) return console.error('Something went wront while writing changes', err)
    },
)
