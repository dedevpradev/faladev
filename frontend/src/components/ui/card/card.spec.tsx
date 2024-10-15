// Card.test.tsx
import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect, vi } from 'vitest'

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '.'

describe('Card Components', () => {
	it('should render Card component correctly', () => {
		render(<Card>Card Content</Card>)
		const cardElement = screen.getByText('Card Content')
		expect(cardElement.className).toBe('rounded-lg border bg-card text-card-foreground shadow-sm')
	})

	it('should render CardHeader component correctly', () => {
		render(<CardHeader>Card Header</CardHeader>)
		const cardHeaderElement = screen.getByText('Card Header')
		expect(cardHeaderElement.className).toBe('flex flex-col space-y-1.5 p-6')
	})

	it('should render CardTitle component correctly', () => {
		render(<CardTitle>Card Title</CardTitle>)
		const cardTitleElement = screen.getByText('Card Title')
		expect(cardTitleElement.className).toBe('text-2xl font-semibold leading-none tracking-tight')
	})

	it('should render CardDescription component correctly', () => {
		render(<CardDescription>Card Description</CardDescription>)
		const cardDescriptionElement = screen.getByText('Card Description')
		expect(cardDescriptionElement.className).toBe('text-sm text-muted-foreground')
	})

	it('should render CardContent component correctly', () => {
		render(<CardContent>Card Content</CardContent>)
		const cardContentElement = screen.getByText('Card Content')
		expect(cardContentElement.className).toBe('p-6 pt-0')
	})

	it('should render CardFooter component correctly', () => {
		render(<CardFooter>Card Footer</CardFooter>)
		const cardFooterElement = screen.getByText('Card Footer')
		expect(cardFooterElement.className).toBe('flex items-center p-6 pt-0')
	})

	it('should forward ref correctly', () => {
		const ref = vi.fn()
		render(<Card ref={ref}>Card Content</Card>)
		expect(ref).toHaveBeenCalled()
		expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement)
	})
})
