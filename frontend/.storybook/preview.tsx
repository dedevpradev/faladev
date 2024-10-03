import type { Preview } from '@storybook/react'
import 'tailwindcss/tailwind.css'
import '../src/app/globals.css'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		nextjs: {
			appDirectory: true,
		},
		layout: 'fullscreen',

		backgrounds: {
			default: 'white',
		},
	},
}

export default preview
