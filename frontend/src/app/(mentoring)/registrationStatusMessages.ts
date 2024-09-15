import { RegistrationResult, Status } from './mentoring.type'

export const registrationStatusMessages: Record<Status, RegistrationResult> = {
	success: {
		status: 'success',
		title: 'Bem vindo à plataforma!',
		description: 'Você vai receber um email de confirmação em breve.',
	},
	error: {
		status: 'error',
		title: 'Oops...',
		description: 'Ocorreu um erro durante seu cadastro.',
	},
}
