import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AyahView from '../components/AyahView'
import '../fonts/index.css'
import { getAyah, searchAyahByText } from './ayah'

function AyahUtilsDemo() {
    const ayah = getAyah(1, 1)
    const searchResults = searchAyahByText('بسم', { limit: 5 })

    return (
        <div style={{ direction: 'rtl', maxWidth: 480, padding: '1rem', color: '#121212' }}>
            <h3 style={{ marginTop: 0 }}>getAyah(1, 1)</h3>
            {ayah ? (
                <>
                    <p style={{ margin: '0.5rem 0' }}>
                        {ayah.surahName} — آية {ayah.ayah}
                    </p>
                    <AyahView surah={1} ayah={1} />
                    <p style={{ fontSize: '0.85em', opacity: 0.8 }}>{ayah.text}</p>
                </>
            ) : (
                <p>Not found</p>
            )}

            <h3>searchAyahByText(&apos;بسم&apos;, limit: 5)</h3>
            <ul style={{ paddingRight: '1.25rem', margin: 0 }}>
                {searchResults.map(result => (
                    <li key={`${result.surah}_${result.ayah}`} style={{ marginBottom: '0.75rem' }}>
                        <strong>
                            {result.surahName} {result.surah}:{result.ayah}
                        </strong>
                        <div style={{ fontSize: '0.9em' }}>{result.text}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const meta: Meta<typeof AyahUtilsDemo> = {
    component: AyahUtilsDemo,
    parameters: {
        layout: 'centered',
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    name: 'Ayah utilities',
}
