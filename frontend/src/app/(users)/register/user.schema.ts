import { z } from 'zod'

export const UserSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(50, { message: 'Nome deve ter no máximo 50 caracteres' })
    .trim(),
  email: z.string().email({ message: 'Endereço de email inválido' }).trim(),
  password: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }).trim(),
  confirmPassword: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }).trim()
})
