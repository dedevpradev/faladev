import type { Meta, StoryObj } from '@storybook/react'

import { Alert, AlertTitle, AlertDescription } from './index'

type Story = StoryObj<typeof Alert>

const meta: Meta<typeof Alert> = {
	component: Alert,
	title: 'Components/UI/Alert',
	parameters: {
		layout: 'centered',
	},
}
export default meta

export const Default: Story = {
	render: () => (
		<Alert>
			<div>
				<AlertTitle>Default Alert</AlertTitle>
				<AlertDescription>This is a default alert description.</AlertDescription>
			</div>
		</Alert>
	),
}

export const Destructive: Story = {
	render: () => (
		<Alert variant="destructive">
			<div>
				<AlertTitle>Destructive Alert</AlertTitle>
				<AlertDescription>
					This is a destructive alert, indicating a serious issue.
				</AlertDescription>
			</div>
		</Alert>
	),
}

export const Creation: Story = {
	render: () => (
		<Alert variant="creation">
			<div>
				<AlertTitle>Creation Alert</AlertTitle>
				<AlertDescription>This alert indicates a successful creation action.</AlertDescription>
			</div>
		</Alert>
	),
}

export const WithoutIcon: Story = {
	render: () => (
		<Alert>
			<div>
				<AlertTitle>Alert Without Icon</AlertTitle>
				<AlertDescription>This alert does not include an icon.</AlertDescription>
			</div>
		</Alert>
	),
}

export const OnlyTitle: Story = {
	render: () => (
		<Alert>
			<AlertTitle>Alert With Only Title</AlertTitle>
		</Alert>
	),
}

export const OnlyDescription: Story = {
	render: () => (
		<Alert>
			<AlertDescription>This alert has only a description without a title.</AlertDescription>
		</Alert>
	),
}

export const CustomStyles: Story = {
	render: () => (
		<Alert className="bg-purple-600 text-white">
			<div>
				<AlertTitle>Custom Styled Alert</AlertTitle>
				<AlertDescription>This alert has custom background and text colors.</AlertDescription>
			</div>
		</Alert>
	),
}
