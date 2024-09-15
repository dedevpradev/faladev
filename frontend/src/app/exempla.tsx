import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { TextInput } from '@/components/form/text-input'
import { AlertBox } from '@/components/ui/alert-box'
import { ErrorMessage } from '@/components/ui/error-message'

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

export type Status = 'error' | 'success'

export type RegistrationResult = {
	title: string
	description: string
	status: Status
}

export type SchemaMentoringType = z.infer<typeof SchemaMentoring>

const useMentoringModel = () => {
	const [alert, setAlert] = useState<RegistrationResult | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SchemaMentoringType>({
		resolver: zodResolver(SchemaMentoring),
	})

	const { mutate } = useMutation<string, AxiosError, SchemaMentoringType>({
		mutationFn: async () => {
			const { data } = await axios.post('/events')
			return data
		},
		onError: () => {
			setAlert({
				status: 'error',
				title: 'Oops...',
				description: 'Ocorreu um erro durante seu cadastro.',
			})
		},
		onSuccess: () => {
			setAlert({
				status: 'success',
				title: 'Bem vindo à plataforma!',
				description: 'Você vai receber um email de confirmação em breve.',
			})
		},
	})

	const onSubmit = (data: SchemaMentoringType) => {
		mutate(data)
	}

	return {
		onSubmit,
		register,
		handleSubmit,
		errors,
		isSubmitting,
		alert,
	}
}

export function MentoringView(props: ReturnType<typeof useMentoringModel>) {
	const { alert, errors, handleSubmit, isSubmitting, onSubmit, register } = props

	return (
		<main className="flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
				<form className="space-y-4" data-testid="form-mentoring" onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-2">
						<TextInput
							label="Nome"
							id="name"
							type="text"
							placeholder="Digite seu nome"
							{...register('name')}
						/>
						<ErrorMessage errors={errors} name="name" />
					</div>
					<div className="mb-2">
						<TextInput
							label="E-mail"
							id="email"
							data-testid="input-email"
							type="email"
							placeholder="Digite seu e-mail"
							{...register('email')}
						/>
						<ErrorMessage errors={errors} name="email" />
					</div>
					<div className="mb-2">
						<TextInput
							label="Telefone"
							id="phone"
							type="text"
							placeholder="Digite seu telefone"
							{...register('phone')}
						/>
						<ErrorMessage errors={errors} name="phone" />
					</div>
					<div className="flex items-center justify-center">
						<button
							className={`bg-blue-500 text-white font-bold py-3 px-6 rounded-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 ${
								isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
							}`}
							type="submit"
							data-testid="button-submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Registrando...' : 'Quero participar'}
						</button>
					</div>
				</form>
				{alert && (
					<AlertBox
						className="mt-4"
						status={alert.status}
						title={alert.title}
						description={alert.description}
					/>
				)}
				<div className="flex justify-center mt-5 w-full text-sm">
					<p>
						ou
						<Link href="/register" className="underline">
							cadastre-se
						</Link>
						na nossa plataforma!
					</p>
				</div>
				<hr className="my-8 border-gray-300" />

				<p className="text-xs text-gray-600 text-center">
					Essa é uma mentoria gratuita para quem está entrando na área de tecnologia, migrando de
					área ou buscando crescimento profissional.
				</p>
			</div>
		</main>
	)
}

export const MentoringPage = () => {
	const methods = useMentoringModel()
	return <MentoringView {...methods} />
}
