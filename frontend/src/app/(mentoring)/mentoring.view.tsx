import Link from 'next/link'

import { useMentoringModel } from './mentoring.model'

import { TextInput } from '@/components/form/text-input'
import { AlertBox } from '@/components/ui/alert-box'
import { ErrorMessage } from '@/components/ui/error-message'


type MentoringViewProps = ReturnType<typeof useMentoringModel>

export function MentoringView(props: MentoringViewProps) {
	const {
		register,
		handleSubmitMentoring,
		handleSubmit,
		errors,
		registrationResult,
		isSubmitting,
		submitButtonLabel,
	} = props
	return (
		<main className="flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
				<form
					className="space-y-4"
					data-testid="form-mentoring"
					onSubmit={handleSubmit(handleSubmitMentoring)}
				>
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
							{submitButtonLabel}
						</button>
					</div>
				</form>
				{registrationResult && (
					<AlertBox
						className="mt-4"
						status={registrationResult.status}
						title={registrationResult.title}
						description={registrationResult.description}
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
