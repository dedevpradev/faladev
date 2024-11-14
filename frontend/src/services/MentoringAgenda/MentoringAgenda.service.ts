import { apiBFF } from '../apiBFF'
import { IMentoringAgendaService } from './IMentoringAgendaService.model'

export class MentoringAgendaService implements IMentoringAgendaService {
	async SignUpMentoring() {
		const { data } = await apiBFF.post('/')
		return data
	}
}
