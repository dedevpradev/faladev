'use client'
import { MentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service'
import { useMentoringModel } from './mentoring.model'
import { MentoringView } from './mentoring.view'

export default function Home() {
	const mentoringAgendaService = new MentoringAgendaService()
	const methods = useMentoringModel(mentoringAgendaService)
	return <MentoringView {...methods} />
}
