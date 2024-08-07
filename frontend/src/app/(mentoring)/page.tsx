'use client'
import { MentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service'

import { useMentoringModel } from './mentoring.model'
import { MentoringView } from './mentoring.view'


export default function Home() {
	const mentoringAgendaService = new MentoringAgendaService()
	const { register, handleOnSubmit, errors } = useMentoringModel(mentoringAgendaService)

	return <MentoringView register={register} handleOnSubmit={handleOnSubmit} errors={errors} />
}
