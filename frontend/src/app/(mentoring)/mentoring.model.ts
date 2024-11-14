import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useMutationMentoring } from '@/Mutate/useMutationMentoring'
import { IMentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service'

import { SchemaMentoring } from './mentoring.schema'
import { RegistrationResult, SchemaMentoringType } from './mentoring.type'
import { registrationStatusMessages } from './registrationStatusMessages'

export function useMentoringModel(mentoringService: IMentoringAgendaService) {
	const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null)
	const onRegistrationSuccess = () => setRegistrationResult(registrationStatusMessages.success)
	const onRegistrationError = () => setRegistrationResult(registrationStatusMessages.error)
	const handleSubmitMentoring = (data: SchemaMentoringType) => createMentoringAgenda(data)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SchemaMentoringType>({
		resolver: zodResolver(SchemaMentoring),
	})
	const submitButtonLabel = isSubmitting ? 'Registrando...' : 'Quero participar'

	const { mutate: createMentoringAgenda } = useMutationMentoring({
		service: mentoringService,
		onError: onRegistrationError,
		onSuccess: onRegistrationSuccess,
	})

	return {
		register,
		handleSubmit,
		handleSubmitMentoring,
		errors,
		registrationResult,
		isSubmitting,
		submitButtonLabel,
	}
}
