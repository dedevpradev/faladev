'use client'
import { useFormState, useFormStatus } from 'react-dom'

import { AlertBox } from '@/components/form/alert-box'
import { ErrorMessage } from '@/components/form/error-message'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUser } from '@/services/user-actions'

const initialState = {
	status: null,
	messsage: null,
	errors: null,
}

export default function RegisterPage() {
	const [state, formAction] = useFormState(createUser, initialState)
	const { pending } = useFormStatus()

	return (
		<form action={formAction}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-3xl">Cadastre-se!</CardTitle>
					<CardDescription>Cadastre suas informações para criar uma conta</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Nome Completo</Label>
						<Input id="name" placeholder="João Gomes" name="name" aria-required />
						<ErrorMessage errors={state.errors} fieldName="name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="me@example.com" name="email" aria-required />
						<ErrorMessage errors={state.errors} fieldName="email" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Senha</Label>
						<Input id="password" type="password" name="password" aria-required />
						<ErrorMessage errors={state.errors} fieldName="password" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirme a Senha</Label>
						<Input id="confirmPassword" type="password" name="confirmPassword" aria-required />
						<ErrorMessage errors={state.errors} fieldName="confirmPassword" />
					</div>
					<Button className="w-full" disabled={pending} type="submit">
						Cadastrar
					</Button>
					<AlertBox {...state} />
				</CardContent>
			</Card>
		</form>
	)
}
