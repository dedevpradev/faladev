import { Schema } from '@/app/(mentoring)/mentoring.model'

export interface IMentoringAgendaService {
	SignUpMentoring: (data: Schema) => void
}
