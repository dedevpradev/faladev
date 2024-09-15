import { z } from 'zod'

export const SchemaMentoring = z.object({
	name: z
		.string()
		.min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
		.max(50, { message: 'Nome deve ter no máximo 50 caracteres' })
		.trim(),
	email: z.string().email({ message: 'Endereço de email inválido' }).trim(),
	phone: z
		.string({ required_error: 'Telefone é necessário' })
		.min(10, { message: 'Telefone deve ter no mínimo 10 dígitos' })
		.max(15, { message: 'Telefone deve ter no máximo 15 dígitos' })
		.regex(/^\d+$/, { message: 'Telefone deve conter apenas números' })
		.trim(),
})
