import { MutationOptions, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { SchemaMentoringType } from '@/app/(mentoring)/mentoring.type'
import { IMentoringAgendaService } from '@/services/MentoringAgenda/IMentoringAgendaService.model'

type MutationMentoringProps = {
	service: IMentoringAgendaService
} & Omit<MutationOptions<string, AxiosError, SchemaMentoringType>, 'mutationFn'>

export const useMutationMentoring = ({ service, ...mutationMentoringProps }: MutationMentoringProps) => {
	return useMutation<string, AxiosError, SchemaMentoringType>({
		mutationFn: data => service.SignUpMentoring(data),
		...mutationMentoringProps,
	})
}
