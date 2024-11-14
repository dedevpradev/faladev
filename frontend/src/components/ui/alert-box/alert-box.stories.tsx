import { Meta, StoryObj } from '@storybook/react'

import { AlertBox } from './'

const meta: Meta<typeof AlertBox> = {
	title: 'Components/UI/AlertBox',
	component: AlertBox,
	argTypes: {
		status: {
			control: { type: 'select', options: ['error', 'success'] },
			description: 'Status of the alert, determines the variant',
		},
		title: {
			control: 'text',
			description: 'Title text for the alert',
		},
		description: {
			control: 'text',
			description: 'Description text for the alert',
		},
	},
	parameters: {
		layout: 'centered',
	},
}

export default meta

type AlertBoxStory = StoryObj<typeof AlertBox>

export const ErrorAlert: AlertBoxStory = {
	args: {
		status: 'error',
		title: 'Error Title',
		description: 'This is an error message.',
	},
}

export const SuccessAlert: AlertBoxStory = {
	args: {
		status: 'success',
		title: 'Success Title',
		description: 'This is a success message.',
	},
}
