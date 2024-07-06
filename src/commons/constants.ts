// Pages that should be centered - vertically
export const CENTERED_PAGES_VERTICAL = [1, 2]

// Pages that should be centered - horizontal
export const CENTERED_PAGES_HORIZONTAL = [1, 2, 602, 603, 604]

// Number of Surah At-Tawbah.
// This is used to prevent adding basmalah in Surah At-Tawbah.
export const SURAH_ATTAWBAH_ID = 9

// Count of the pages of the Quran (Hafs narration)
export const HAFS_PAGES_COUNT = 604

/**
 * Lines to center.
 * There are some lines that should have verses in the center to match The Medina Mushaf (officially: Mushaf al-Madinah an-Nabawiyyah, Arabic: مصحف المدينة النبوية).
 * For example, the last two verses of Surah Al-Qari'ah

 * The structure of the data is an array of [SURAH_ID, PAGE_NUMBER, LINE_NUMBER_ON_PAGE]

 * SURAH_ID: Used to ensure that the surah is in the provided LINE_NUMBER_ON_PAGE
 * PAGE_NUMBER: Indicates the page where the line is located
 * LINE_NUMBER_ON_PAGE: Specifies which line of the page should be centered
 * 
 * @constant [SURAH_ID, PAGE_NUMBER, LINE_NUMBER_ON_PAGE]
 */
export const MEDINA_MUSHAF_CENTERED_LINES = [
    [13, 255, 2],
    [53, 528, 9],
    [55, 534, 6],
    [58, 545, 6],
    [80, 586, 1],
    [88, 593, 2],
    [89, 594, 5],
    [101, 600, 8],
]
