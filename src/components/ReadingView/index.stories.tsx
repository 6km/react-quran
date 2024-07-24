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
            // backgroundColor: 'hsl(0 0% 95% / 1)',
            backgroundColor: '#F3F4F5',
            // border: '1px solid rgba(0,0,0,0.1)',
            // backgroundColor: '#292C2E',
            color: '#121212',
            borderRadius: 4,
        },
        surahTitleStyles: {
            border: '1px solid rgba(0,0,0,0.075)',
            backgroundColor: 'rgba(200,200,200,0.25)',
        },
        fixedAspectRatio: true,
    },
}
