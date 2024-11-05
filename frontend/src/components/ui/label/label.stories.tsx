import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './'

const meta: Meta<typeof Label> = {
	component: Label,
	title: 'Components/UI/Label',
	argTypes: {
		className: {
			control: 'text',
			description: 'Adicione classes adicionais para estilização',
		},
	},
	parameters: {
		layout: 'centered',
	},
}
export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
	render: () => <Label>Label Text</Label>,
}

export const Disabled: Story = {
	render: () => <Label className="peer-disabled">Disabled Label</Label>,
	args: {
		className: 'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
	},
}

export const CustomStyle: Story = {
	render: () => <Label className="text-lg text-red-500">Custom Styled Label</Label>,
}
