import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Button } from '.'

describe('Button Component', () => {
	it('should render a button with default styles', () => {
		const screen = render(<Button data-testid="button">Click me</Button>)
		const button = screen.getByTestId('button')
		expect(button.className).toBe(
			'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
		)
	})

	it('should apply the correct classes based on variant', () => {
		render(<Button variant="destructive">Delete</Button>)
		const button = screen.getByText('Delete')
		expect(button.className).toBe(
			'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2',
		)
	})

	it('should disable the button when `disabled` prop is true', () => {
		render(<Button disabled>Disabled Button</Button>)
		const button = screen.getByText('Disabled Button') as HTMLButtonElement
		expect(button.disabled).toBe(true)
	})

	it('should render as a Slot when `asChild` prop is true', () => {
		const { container } = render(
			<Button asChild>
				<span data-testid="custom-element">Child Element</span>
			</Button>,
		)
		const element = container.querySelector('[data-testid="custom-element"]')
		expect(element).toBeTruthy()
		expect(element?.tagName).toBe('SPAN')
	})

	it('should trigger onClick handler when clicked', () => {
		const handleClick = vi.fn()
		render(<Button onClick={handleClick}>Click Me</Button>)
		const button = screen.getByText('Click Me')
		fireEvent.click(button)
		expect(handleClick).toHaveBeenCalledTimes(1)
	})
})
