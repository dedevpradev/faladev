import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SchemaMentoring } from './mentoring.schema'
import { IMentoringAgendaService } from '@/services/MentoringAgenda/IMentoringAgendaService.model'
import { useMutationMentoring } from '@/Mutate/useMutationMentoring'
import { registrationStatusMessages } from './registrationStatusMessages'
import { RegistrationResult, SchemaMentoringType } from './mentoring.type'

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
	}
}
