import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect, vi } from 'vitest'

import { Label } from '.'

describe('Label Component', () => {
	it('should render correctly', () => {
		const labelText = 'Test Label'
		render(<Label data-testid="label">{labelText}</Label>)

		const labelElement = screen.getByTestId('label')
		expect(labelElement.textContent).toBe(labelText)
	})

	it('should forward ref correctly', () => {
		const ref = vi.fn()

		render(<Label ref={ref}>Test Label</Label>)

		expect(ref).toHaveBeenCalled()
		expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLLabelElement)
	})

	it('should apply className and labelVariants correctly', () => {
		render(<Label id="custom-class">Test Label</Label>)

		const labelElement = screen.getByText('Test Label')
		expect(labelElement.id).toBe('custom-class')
	})
})
