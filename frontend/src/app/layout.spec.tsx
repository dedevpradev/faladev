import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import RootLayout from '@/app/layout'

vi.mock('next/font/google', () => ({
	Inter: vi.fn().mockReturnValue({ className: 'mocked-inter-font' }),
}))

describe('RootLayout', () => {
	it('should render the header with the logo', () => {
		render(
			<RootLayout>
				<div>Child Component</div>
			</RootLayout>,
		)

		const logo = screen.getByAltText('FalaDev Logo')
		expect(logo).toBeTruthy()
	})

	it('should render the children content', () => {
		render(
			<RootLayout>
				<div>Child Component</div>
			</RootLayout>,
		)

		const childContent = screen.getByText('Child Component')
		expect(childContent).toBeTruthy()
	})

	it('should render the footer with the Instagram link', () => {
		render(
			<RootLayout>
				<div>Child Component</div>
			</RootLayout>,
		)

		const instagramLink = screen.getByAltText('Instagram FalaDev')
		expect(instagramLink).toBeTruthy()
	})

	it('should render the footer with the YouTube link', () => {
		render(
			<RootLayout>
				<div>Child Component</div>
			</RootLayout>,
		)

		const youtubeLink = screen.getByAltText('YouTube FalaDev')
		expect(youtubeLink).toBeTruthy()
	})

	it('should render the footer with the WhatsApp link', () => {
		render(
			<RootLayout>
				<div>Child Component</div>
			</RootLayout>,
		)

		const whatsappLink = screen.getByAltText('WhatsApp FalaDev')
		expect(whatsappLink).toBeTruthy()
	})
})
