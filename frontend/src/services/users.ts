'use server'

import { z } from 'zod'

import { apiBFF } from './apiBFF'

export type Fields = {
	name: string
	email: string
	password: string
	passwordConfirmation: string
}

const schema = z.object({
	name: z.string().min(3),
	email: z.string(),
	password: z.string(),
	passwordConfirmation: z.string(),
})

export type FormState = {
	message: string
	errors: Record<keyof Fields, string> | null
}

export async function createUser(prevState: FormState, formData: FormData): Promise<FormState> {
	const validatedFields = schema.safeParse({
		name: formData.get('full-name'),
		email: formData.get('email'),
		password: formData.get('password'),
		passwordConfirmation: formData.get('confirm-password'),
	})

	console.log(validatedFields)
	if (!validatedFields.success) {
		return {
			message: 'error',
			errors: validatedFields.error,
		}
	}

	try {
		await apiBFF.post('/user', validatedFields.data)
	} catch (error) {
		throw new Error(`Server error ${error}`)
	}

	console.log('createUser from use server', validatedFields)
}
