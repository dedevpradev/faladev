import { apiBFF } from '../apiBFF';

import { IMentoringAgendaService } from './IMentoringAgendaService.model';

export class MentoringAgendaService implements IMentoringAgendaService {
	async SignUpMentoring(formData: FormData) {
		const { data } = await apiBFF.post('/event', formData)
		return data
	}
}
