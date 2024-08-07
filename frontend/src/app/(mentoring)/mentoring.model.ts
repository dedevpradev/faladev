import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { IMentoringAgendaService } from '@/services/MentoringAgenda/IMentoringAgendaService.model'

const schema = z.object({
	name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
	email: z.string().email({ message: 'Endereço de email inválido' }),
	phone: z.string({ required_error: 'Telefone é necessário' }),
})

export type Schema = z.infer<typeof schema>

export function useMentoringModel(service: IMentoringAgendaService) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	})

	const createMentoringAgenda = (data: Schema): void => {
		const formData = new FormData()

		for (const [key, value] of Object.entries(data)) {
			formData.set(key, value)
		}

		service.SignUpMentoring(formData)
	}

	const handleOnSubmit = handleSubmit(data => createMentoringAgenda(data))

	return { register, handleOnSubmit, errors }
}
