import type { Meta, StoryObj } from '@storybook/react'

import { ErrorMessage } from './'

const mockErrors = {
	email: {
		message: 'O campo de e-mail é obrigatório',
	},
	password: {
		message: 'A senha deve ter pelo menos 8 caracteres',
	},
}

const meta: Meta<typeof ErrorMessage> = {
	component: ErrorMessage,
	title: 'Components/UI/ErrorMessage',
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		name: {
			control: 'text',
			description: 'Nome do campo do formulário para o qual exibir a mensagem de erro',
		},
		errors: {
			control: 'object',
			description: 'Objeto contendo os erros do formulário',
		},
	},
}
export default meta

type Story = StoryObj<typeof ErrorMessage>

export const EmailError: Story = {
	args: {
		name: 'email',
		errors: mockErrors,
	},
}

export const PasswordError: Story = {
	args: {
		name: 'password',
		errors: mockErrors,
	},
}

export const NoError: Story = {
	args: {
		name: 'username',
		errors: mockErrors,
	},
}
