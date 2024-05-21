import type { Meta, StoryObj } from '@storybook/react'
import { ReadingView } from './index'
import '../../fonts/index.css'

const meta: Meta<typeof ReadingView> = {
    component: ReadingView,
    parameters: {
        layout: 'centered',
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    name: 'ReadingView',
    args: {
        page: 2,
        readingViewStyles: {
            width: '512px',
            maxWidth: '100%',
            backgroundColor: 'hsl(200 5% 90% / 1)',
            borderRadius: 8,
        },
        fixedAspectRatio: true,
    },
}
