import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { ErrorMessage } from './'

const mockErrors = {
	email: {
		message: 'O campo de e-mail é obrigatório',
	},
	password: {
		message: 'A senha deve ter pelo menos 8 caracteres',
	},
}

describe('ErrorMessage', () => {
	it('deve exibir a mensagem de erro para o campo de email', () => {
		render(<ErrorMessage name="email" errors={mockErrors} />)

		const errorMessage = screen.getByTestId('error-message')

		expect(errorMessage.textContent).toBe('O campo de e-mail é obrigatório')
	})

	it('deve exibir a mensagem de erro para o campo de senha', () => {
		render(<ErrorMessage name="password" errors={mockErrors} />)

		const errorMessage = screen.getByTestId('error-message')

		expect(errorMessage.textContent).toBe('A senha deve ter pelo menos 8 caracteres')
	})

	it('não deve exibir mensagem de erro se o campo não tiver erro', () => {
		render(<ErrorMessage name="username" errors={mockErrors} />)

		const errorMessage = screen.queryByTestId('error-message') ?? null
		expect(errorMessage).toBeNull()
	})
})
