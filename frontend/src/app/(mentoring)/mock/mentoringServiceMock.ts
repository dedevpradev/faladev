import { IMentoringAgendaService } from '@/services/MentoringAgenda/IMentoringAgendaService.model'
import { SchemaMentoringType } from '../mentoring.type'

export const successfulMentoringServiceMock: IMentoringAgendaService = {
	SignUpMentoring: () => Promise.resolve('success'),
}

export const failedMentoringServiceMock: IMentoringAgendaService = {
	SignUpMentoring: () => Promise.reject(new Error('Error')),
}

export const mockSchemaMentoringTypeData: SchemaMentoringType = {
	name: 'John Doe',
	email: 'johndoe@example.com',
	phone: '119999999',
}
