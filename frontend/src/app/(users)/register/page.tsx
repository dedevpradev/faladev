'use client'
import { useFormState, useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUser, type FormState } from '@/services/users'

export default function RegisterPage() {
	const [state, formAction] = useFormState(createUser, { message: '', errors: null })
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
						<Label htmlFor="full-name">Nome Completo</Label>
						<Input id="full-name" placeholder="João Gomes" name="full-name" required minLength={3} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="me@example.com" name="email" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Senha</Label>
						<Input id="password" type="password" name="password" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirm-password">Confirme a Senha</Label>
						<Input id="confirm-password" type="password" name="confirm-password" required />
					</div>
					<Button className="w-full" disabled={pending} type="submit">
						Cadastrar
					</Button>
				</CardContent>
			</Card>
		</form>
	)
}
