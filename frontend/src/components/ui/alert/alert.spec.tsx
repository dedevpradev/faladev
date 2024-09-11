import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Alert, AlertTitle, AlertDescription } from './'

describe('Alert Component', () => {
	it('deve renderizar o Alert com a variante "destructive"', () => {
		render(
			<Alert variant="destructive">
				<svg data-testid="icon" />
				<AlertTitle>Título do Alerta</AlertTitle>
				<AlertDescription>Descrição do Alerta</AlertDescription>
			</Alert>,
		)

		const alert = screen.getByRole('alert')
		expect(alert).toBeInTheDocument()

		const icon = screen.getByTestId('icon')
		expect(icon).toBeInTheDocument()

		const title = screen.getByText('Título do Alerta')
		expect(title).toBeInTheDocument()

		const description = screen.getByText('Descrição do Alerta')
		expect(description).toBeInTheDocument()
	})

	it('deve renderizar o Alert com a variante "creation"', () => {
		render(
			<Alert variant="creation">
				<svg data-testid="icon" />
				<AlertTitle>Título do Alerta</AlertTitle>
				<AlertDescription>Descrição do Alerta</AlertDescription>
			</Alert>,
		)

		const alert = screen.getByRole('alert')
		expect(alert).toBeInTheDocument()

		const icon = screen.getByTestId('icon')
		expect(icon).toBeInTheDocument()

		const title = screen.getByText('Título do Alerta')
		expect(title).toBeInTheDocument()

		const description = screen.getByText('Descrição do Alerta')
		expect(description).toBeInTheDocument()
	})

	it('deve renderizar AlertTitle e AlertDescription corretamente', () => {
		render(
			<Alert>
				<svg data-testid="icon" />
				<AlertTitle>Título Personalizado</AlertTitle>
				<AlertDescription>Descrição Personalizada</AlertDescription>
			</Alert>,
		)

		const title = screen.getByText('Título Personalizado')
		expect(title).toBeInTheDocument()

		const description = screen.getByText('Descrição Personalizada')
		expect(description).toBeInTheDocument()
	})
})
