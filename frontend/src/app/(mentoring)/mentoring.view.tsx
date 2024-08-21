import Link from 'next/link'
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form'

import { AlertBox } from '@/components/form/alert-box'
import { ErrorMessage } from '@/components/form/error-message'

import { ApiStatus, Schema } from './mentoring.model'

export type Errors = FieldErrors<{
	[key: string]: any
}>

type MentoringViewProps = {
	register: UseFormRegister<Schema>
	handleOnSubmit: () => void
	errors: Errors
	apiStatus: ApiStatus
	isSubmitting: boolean
}

export function MentoringView(props: MentoringViewProps) {
	const { register, handleOnSubmit, errors, apiStatus, isSubmitting } = props

	return (
		<main className="flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
				<form className="space-y-4" onSubmit={handleOnSubmit}>
					<div className="mb-2">
						<label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="name">
							Nome
						</label>
						<input
							className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
							id="name"
							type="text"
							{...register('name')}
							placeholder="Digite seu nome"
						/>
						<ErrorMessage errors={errors} fieldName="name" />
					</div>
					<div className="mb-2">
						<label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="email">
							E-mail
						</label>
						<input
							className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
							id="email"
							type="email"
							{...register('email')}
							placeholder="Digite seu e-mail"
						/>
						<ErrorMessage errors={errors} fieldName="email" />
					</div>
					<div className="mb-2">
						<label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="phone">
							Telefone
						</label>
						<input
							className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
							id="phone"
							type="text"
							{...register('phone')}
							placeholder="Digite seu telefone"
						/>
						<ErrorMessage errors={errors} fieldName="phone" />
					</div>
					<div className="flex items-center justify-center">
						<button
							className={`bg-blue-500 text-white font-bold py-3 px-6 rounded-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 ${
								isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
							}`}
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Registrando...' : 'Quero participar'}
						</button>
					</div>
				</form>
				<AlertBox className="mt-4" status={apiStatus.status} message={apiStatus.message} />
				<div className="flex justify-center mt-5 w-full text-sm">
					<p>
						ou{' '}
						<Link href="/register" className="underline">
							cadastre-se
						</Link>{' '}
						na nossa plataforma!
					</p>
				</div>
				<hr className="my-8 border-gray-300" />

				<p className="text-xs text-gray-600 text-center">
					Essa é uma mentoria gratuita para quem está entrando na área de tecnologia, migrando de área ou buscando
					crescimento profissional.
				</p>
			</div>
		</main>
	)
}
