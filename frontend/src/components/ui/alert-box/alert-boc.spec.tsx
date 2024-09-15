import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Status } from '@/app/(mentoring)/mentoring.type'

import { AlertBox } from './'

describe('AlertBox Component', () => {
	it('should render AlertBox with correct title and description for error status', () => {
		render(<AlertBox status="error" title="Error Title" description="Error Description" />)

		const alertTitle = screen.getByTestId('alert-title')
		const alertDescription = screen.getByTestId('alert-description')

		expect(alertTitle).toHaveTextContent('Error Title')
		expect(alertDescription).toHaveTextContent('Error Description')
	})

	it('should render AlertBox with correct title and description for success status', () => {
		render(<AlertBox status="success" title="Success Title" description="Success Description" />)

		const alertTitle = screen.getByTestId('alert-title')
		const alertDescription = screen.getByTestId('alert-description')

		expect(alertTitle).toHaveTextContent('Success Title')
		expect(alertDescription).toHaveTextContent('Success Description')
	})
})
