'use client'
import { HttpAxiosAdapter } from '@/infra/http/HttpClient'
import { MentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service'

import { useMentoringModel } from './mentoring.model'
import { MentoringView } from './mentoring.view'

export default function Home() {
	const httpAxiosAdapter = new HttpAxiosAdapter()
	const mentoringAgendaService = new MentoringAgendaService(httpAxiosAdapter)
	const methods = useMentoringModel(mentoringAgendaService)
	return <MentoringView {...methods} />
}
