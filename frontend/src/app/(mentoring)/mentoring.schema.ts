import { z } from 'zod'

export const SchemaMentoring = z.object({
	name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
	email: z.string().email({ message: 'Endereço de email inválido' }),
	phone: z.string({ required_error: 'Telefone é necessário' }),
})

export type SchemaMentoringType = z.infer<typeof SchemaMentoring>
