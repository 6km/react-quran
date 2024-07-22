import type { Preview } from '@storybook/react'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'gray',
            values: [
                {
                    name: 'gray',
                    value: '#1B1C1D',
                },
                {
                    name: 'white',
                    value: '#FFFFFF',
                },
            ],
        },
    },
}

export default preview
