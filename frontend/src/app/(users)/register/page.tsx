import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
	return (
		<form action="">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-3xl">Cadastre-se!</CardTitle>
					<CardDescription>Cadastre suas informações para criar uma conta</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="full-name">Nome Completo</Label>
						<Input id="full-name" placeholder="João Gomes" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="me@example.com" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Senha</Label>
						<Input id="password" type="password" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirm-password">Confirme a Senha</Label>
						<Input id="confirm-password" type="password" required />
					</div>
					<Button className="w-full">Cadastrar</Button>
				</CardContent>
			</Card>
		</form>
	)
}
