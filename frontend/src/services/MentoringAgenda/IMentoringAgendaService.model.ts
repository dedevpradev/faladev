import { SchemaMentoringType } from '@/app/(mentoring)/mentoring.type'

export interface IMentoringAgendaService {
	SignUpMentoring: (data: SchemaMentoringType) => Promise<string>
}
