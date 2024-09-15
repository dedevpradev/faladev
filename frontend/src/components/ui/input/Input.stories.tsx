import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '.'

export type Story = StoryObj<typeof Input>

const meta: Meta<typeof Input> = {
	component: Input,
	title: 'Components/UI/Input',
	parameters: {
		layout: 'centered',
	},
}
export default meta

export const Default: Story = {
	render: () => {
		return <Input className="border-2" />
	},
}
