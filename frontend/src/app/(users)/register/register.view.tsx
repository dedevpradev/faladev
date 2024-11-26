import { AlertBox } from "@/components/ui/alert-box"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorMessage } from "@/components/ui/error-message"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserModel } from "./user.model"


type RegisterViewProps = ReturnType<typeof useUserModel>


export const RegisterView = (props: RegisterViewProps) => {
  const { register, errors, isSubmitting } = props

  return (
    <form >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl">Cadastre-se!</CardTitle>
          <CardDescription>Cadastre suas informações para criar uma conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" placeholder="João Gomes" aria-required {...register('name')} />
            <ErrorMessage errors={errors as Record<string, { message: string; }>} name="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="me@example.com" {...register('email')} aria-required />
            <ErrorMessage errors={errors as Record<string, { message: string; }>} name="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register('password')} aria-required />
            <ErrorMessage errors={errors as Record<string, { message: string; }>} name="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirme a Senha</Label>
            <Input id="confirmPassword" type="password"  {...register('confirmPassword')} aria-required />
            <ErrorMessage errors={errors as Record<string, { message: string; }>} name="confirmPassword" />
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Cadastrar
          </Button>
          {/* <AlertBox {...state} /> */}
        </CardContent>
      </Card>
    </form>
  )
}
