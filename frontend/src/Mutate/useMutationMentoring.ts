import { MutationOptions, useMutation } from '@tanstack/react-query'

import { SchemaMentoringType } from '@/app/(mentoring)/mentoring.type'
import { IMentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service'

type MutationMentoringProps = {
	service: IMentoringAgendaService
} & Omit<MutationOptions<string, Error, SchemaMentoringType>, 'mutationFn'>

export const useMutationMentoring = ({
	service,
	...mutationMentoringProps
}: MutationMentoringProps) => {
	return useMutation<string, Error, SchemaMentoringType>({
		mutationFn: data => service.SignUpMentoring(data),
		...mutationMentoringProps,
	})
}
