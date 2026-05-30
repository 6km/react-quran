import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AyahView from './AyahView'
import '../fonts/index.css'
import { getAyah } from '../utils/ayah'
import type { CSSProperties } from 'react'

type AyahViewStoryProps = {
    surah: number
    ayah: number
    style?: CSSProperties
    className?: string
}

function AyahViewStory({ surah, ayah, style, className }: AyahViewStoryProps) {
    const result = getAyah(surah, ayah)
    if (!result) {
        return <p style={{ color: '#121212' }}>Ayah not found ({surah}:{ayah})</p>
    }
    return <AyahView verse={result.verse} style={style} className={className} />
}

const meta: Meta<typeof AyahViewStory> = {
    component: AyahViewStory,
    parameters: {
        layout: 'centered',
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    name: 'AyahView',
    args: {
        surah: 1,
        ayah: 1,
        style: {
            maxWidth: '360px',
            padding: '1rem',
            backgroundColor: '#F3F4F5',
            color: '#121212',
            borderRadius: 4,
        },
    },
    argTypes: {
        surah: { type: 'number' },
        ayah: { type: 'number' },
        style: { control: 'object' },
        className: { type: 'string' },
    },
}
