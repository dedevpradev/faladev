import type { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './index'

type Story = StoryObj<typeof Card>

const meta: Meta<typeof Card> = {
	component: Card,
	title: 'Components/UI/Card',
	parameters: {
		layout: 'centered',
	},
}
export default meta

export const Default: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Default Card</CardTitle>
				<CardDescription>This is the default card description.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>This is the content inside the default card.</p>
			</CardContent>
			<CardFooter>
				<button>Action</button>
			</CardFooter>
		</Card>
	),
}

export const WithLongContent: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Card with Long Content</CardTitle>
				<CardDescription>
					Here is some lengthy description text to show how the card handles more content.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
					dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.
					Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
				</p>
			</CardContent>
			<CardFooter>
				<button>Action</button>
			</CardFooter>
		</Card>
	),
}

export const WithImage: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<Image src="https://via.placeholder.com/150" alt="Placeholder Image" />
				<CardTitle>Card with Image</CardTitle>
				<CardDescription>This card has an image in the header.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>This is the content of a card with an image.</p>
			</CardContent>
			<CardFooter>
				<button>Action</button>
			</CardFooter>
		</Card>
	),
}

export const WithoutFooter: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Card Without Footer</CardTitle>
				<CardDescription>This card does not have a footer.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>This is the content of a card without a footer.</p>
			</CardContent>
		</Card>
	),
}

export const CustomStyles: Story = {
	render: () => (
		<Card className="bg-blue-500 text-white">
			<CardHeader className="bg-blue-700">
				<CardTitle>Custom Styled Card</CardTitle>
				<CardDescription>This card has custom styles applied.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>This is the content of a card with custom styles.</p>
			</CardContent>
			<CardFooter>
				<button className="bg-white text-blue-500 px-4">Action</button>
			</CardFooter>
		</Card>
	),
}
