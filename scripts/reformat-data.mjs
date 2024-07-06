import { writeFile } from 'fs'
import old_data from '../src/data/pages.json' with { type: 'json' }
import path from 'path'

const old_size = Buffer.byteLength(JSON.stringify(old_data))

let new_data = new Object(old_data)

// turning data to array of instead of key-value object
// -3 KB
new_data = Object.values(old_data)

new_data = new_data.map(page_data => {
    // delete "v" which stands for "verse" number
    // delete "c" which stands for "chapter" (surah) number
    // and store them in a single property called "d" which stands for "data"
    // -0.011894 MB
    return page_data.map(({ v, c, ...verse_data }) => {
        return {
            ...verse_data,
            d: `${c}_${v}`,

            // delete "type" from verse words if the type equals "word"
            // because the default value of words is "word"
            // -1.1518 MB
            w: verse_data.w.map(({ text_uthmani, ...word_data }) => {
                if (word_data.type === 'word') delete word_data.type

                // change "text_uthmani" to "uthmani"
                // -0.3989458 MB
                return { uthmani: text_uthmani, ...word_data }
            }),
        }
    })
})

const new_json_data = JSON.stringify(new_data)

writeFile(
    path.resolve('./src/data/pages-v2.json'),
    new_json_data,
    {
        encoding: 'utf8',
    },
    err => {
        if (err) return console.error('Something went wront while writing changes', err)
    },
)

const new_size = Buffer.byteLength(JSON.stringify(new_data))
console.log((old_size - new_size) / (1024 * 1024))
