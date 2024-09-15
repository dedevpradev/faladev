import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

export type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
	component: Button,
	title: 'Components/UI/Button',
	parameters: {
		layout: 'centered',
	},
}
export default meta

export const Default: StoryObj<typeof Button> = {
	render: () => <Button>Click</Button>,
}

export const Destructive: StoryObj<typeof Button> = {
	render: () => <Button variant="destructive">Click</Button>,
}

export const Ghost: StoryObj<typeof Button> = {
	render: () => <Button variant="ghost">Click</Button>,
}

export const Link: StoryObj<typeof Button> = {
	render: () => <Button variant="link">Click</Button>,
}

export const Outline: StoryObj<typeof Button> = {
	render: () => <Button variant="outline">Click</Button>,
}

export const Secondary: StoryObj<typeof Button> = {
	render: () => <Button variant="secondary">Click</Button>,
}

export const SM: StoryObj<typeof Button> = {
	render: () => <Button size="sm">Click</Button>,
}

export const LG: StoryObj<typeof Button> = {
	render: () => <Button size="lg">Click</Button>,
}

export const Icon: StoryObj<typeof Button> = {
	render: () => <Button size="icon">Click</Button>,
}
