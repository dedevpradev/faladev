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
    message: undefined,
    errors: null,
}

export default function EventPage() {
    const [state, formAction] = useFormState(createUser, initialState)
    const { pending } = useFormStatus()

    return (
        <form action={formAction}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">Cadastrar Novo Evento</CardTitle> 
                    <CardDescription>Preencha as informações para cadastrar um evento</CardDescription> 
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="eventName">Evento</Label>
                        <Input id="eventName" placeholder="Nome do Evento" name="eventName" /> 
                        <ErrorMessage errors={state.errors} fieldName="eventName" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="eventDate">Data do Evento</Label>
                        <Input id="eventDate" type="date" name="eventDate" />
                        <ErrorMessage errors={state.errors} fieldName="eventDate" />
                    </div>
                    <Button className="w-full" disabled={pending} type="submit">
                        Cadastrar Evento
                    </Button>
                    <AlertBox {...state} />
                </CardContent>
            </Card>
        </form>
    )
}
