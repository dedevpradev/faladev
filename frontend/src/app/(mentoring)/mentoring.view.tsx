'use client'

import Link from 'next/link'

import { useMentoringModel } from './mentoring.model'

import { MentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service'

export function MentoringView() {
	const mentoringAgendaService = new MentoringAgendaService()
	const { register, handleOnSubmit } = useMentoringModel(mentoringAgendaService)

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
					</div>
					<div className="flex items-center justify-center">
						<button
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
							type="submit"
						>
							Quero participar
						</button>
					</div>
				</form>
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
