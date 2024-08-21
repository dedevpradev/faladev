import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { IMentoringAgendaService } from '@/services/MentoringAgenda/IMentoringAgendaService.model'

const schema = z.object({
	name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
	email: z.string().email({ message: 'Endereço de email inválido' }),
	phone: z.string({ required_error: 'Telefone é necessário' }),
})

export type Schema = z.infer<typeof schema>

export type ApiStatus = {
	status: 'success' | 'error' | null
	message?: {
		title: string
		description?: string
	}
}

export function useMentoringModel(service: IMentoringAgendaService) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
	})

	const [apiStatus, setApiStatus] = useState<ApiStatus>({ status: null, message: undefined })

	const createMentoringAgenda = async (data: Schema): Promise<void> => {
		try {
			await service.SignUpMentoring(data)
			setApiStatus({
				status: 'success',
				message: {
					title: 'Bem vindo à plataforma!',
					description: 'Você vai receber um email de confirmação em breve.',
				},
			})
		} catch (error) {
			setApiStatus({
				status: 'error',
				message: { title: 'Oops...', description: 'Ocorreu um erro durante seu cadastro.' },
			})
		}
	}

	const handleOnSubmit = handleSubmit(data => createMentoringAgenda(data))

	return { register, handleOnSubmit, errors, apiStatus, isSubmitting }
}
