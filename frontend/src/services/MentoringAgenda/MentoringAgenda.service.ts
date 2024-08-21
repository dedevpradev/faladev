import { Schema } from '@/app/(mentoring)/mentoring.model'

import { apiBFF } from '../apiBFF'

import { IMentoringAgendaService } from './IMentoringAgendaService.model'

export class MentoringAgendaService implements IMentoringAgendaService {
	async SignUpMentoring(userData: Schema) {
		const { data } = await apiBFF.post('/api/events', userData)
		return data
	}
}
