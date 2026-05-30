import type { Meta, StoryObj } from '@storybook/react'
import AyahView from './AyahView'
import '../fonts/index.css'

const meta: Meta<typeof AyahView> = {
    component: AyahView,
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
