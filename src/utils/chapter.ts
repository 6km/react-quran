import surah from '../data/surah.json'

export function getChapterName(number: number) {
    return surah[number - 1]
}
