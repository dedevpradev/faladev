import { useMentoringModel } from '../mentoring.model'
import { MentoringView } from '../mentoring.view'
import { successfulMentoringServiceMock } from '../mock/mentoringServiceMock'

const MakeSut = () => {
	const methods = useMentoringModel(successfulMentoringServiceMock)
	return <MentoringView {...methods} />
}
