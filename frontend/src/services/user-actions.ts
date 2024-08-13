'use server'

import { z } from 'zod'

import { apiBFF } from './apiBFF'

export type Fields = {
	name: string
	email: string
	password: string
	confirmPassword: string
	eventName: string
	eventDate: string
}

export type FormState = {
	status: 'success' | 'error' | null
	message?: {
		title?: string
		description?: string
	}
	errors?: Partial<Record<keyof Fields, string[]>> | null
}

const schema = z
	.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
		eventName: z.string().optional(),
		eventDate: z.string().optional()
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Senha e Confirmação de senha precisam ser iguais',
		path: ['confirmPassword'],
	})

export async function createUser(prevState: FormState, formData: FormData): Promise<FormState> {
	const validatedFields = schema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
		eventName: formData.get('eventName'),
		eventDate: formData.get('eventDate'),
	})

	if (!validatedFields.success) {
		return {
			status: 'error',
			message: {
				title: 'Erro ao validar informações de cadastro',
				description: 'Verifique as informações fornecidas',
			},
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	try {
		apiBFF.post('/user', validatedFields.data)

		return {
			status: 'success',
			message: {
				title: 'Seja bem vindo!',
				description: 'Cadastro realizado com sucesso',
			},
		}
	} catch (error) {
		return {
			status: 'error',
			message: {
				title: 'Oops...',
				description: 'Ocorreu um erro durante a criação',
			},
		}
	}
}
