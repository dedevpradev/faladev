import { SchemaMentoringType } from '@/app/(mentoring)/mentoring.schema'
import { apiBFF } from '../apiBFF'
import { IMentoringAgendaService } from './IMentoringAgendaService.model'

export class MentoringAgendaService implements IMentoringAgendaService {
	async SignUpMentoring(userData: SchemaMentoringType): Promise<string> {
		const { data } = await apiBFF.post<string>('/events', userData)
		return data
	}
}
