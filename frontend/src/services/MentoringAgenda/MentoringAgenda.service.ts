import { apiBFF } from '../apiBFF'

interface IMentoringAgendaService {
	SignUpMentoring: () => void
}

export class MentoringAgendaService implements IMentoringAgendaService {
	async SignUpMentoring() {
		const { data } = await apiBFF.post('/')
	}
}
