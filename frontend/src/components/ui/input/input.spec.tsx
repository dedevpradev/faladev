import { fireEvent, render } from '@testing-library/react'
import { Input } from '.'

import React from 'react'

describe('<Input />', () => {
	test('applies custom class', () => {
		const screen = render(<Input id="custom-class" />)
		const inputElement: HTMLInputElement = screen.getByTestId('textbox') as HTMLInputElement
		expect(inputElement.id).toBe('custom-class')
	})

	test('input is disabled', () => {
		const screen = render(<Input disabled />)
		const inputElement: HTMLInputElement = screen.getByTestId('textbox') as HTMLInputElement
		expect(inputElement.disabled).toBe(true)
	})

	test('displays correct value', () => {
		const screen = render(<Input defaultValue="Value" />)
		const inputElement: HTMLInputElement = screen.getByTestId('textbox') as HTMLInputElement
		expect(inputElement.value).toBe('Value')
	})

	test('updates value correctly', () => {
		const { getByTestId } = render(<Input />)
		const inputElement: HTMLInputElement = getByTestId('textbox') as HTMLInputElement

		fireEvent.change(inputElement, { target: { value: 'New Value' } })
		expect(inputElement.value).toBe('New Value')
	})
})
