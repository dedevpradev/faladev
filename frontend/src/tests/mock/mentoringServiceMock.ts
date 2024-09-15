import { IMentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service'

export const successfulMentoringServiceMock: IMentoringAgendaService = {
	SignUpMentoring: () => Promise.resolve('success'),
}

export const failedMentoringServiceMock: IMentoringAgendaService = {
	SignUpMentoring: () => Promise.reject(new Error('Error')),
}
