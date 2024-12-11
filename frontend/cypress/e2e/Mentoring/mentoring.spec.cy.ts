import { registrationStatusMessages } from '../../../src/shared/registrationStatusMessages'

import { MentoringPage } from './MentotingPage'

describe('<MentoringPage />', () => {
	it('should display errors on the screen after form submission', () => {
		MentoringPage.visit()
		MentoringPage.clickSubmitButton()
		MentoringPage.getDisplayedErrors(3)

		MentoringPage.fillEmailInput()
		MentoringPage.getDisplayedErrors(2)

		MentoringPage.fillNameInput()
		MentoringPage.getDisplayedErrors(1)

		MentoringPage.fillPhoneInput()
		MentoringPage.getDisplayedErrors(0)
	})
	it('Should Display Success Message After Successful Registration', () => {
		MentoringPage.MockRegisterSuccess()
		MentoringPage.visit()

		MentoringPage.fillEmailInput()
		MentoringPage.fillNameInput()
		MentoringPage.fillPhoneInput()

		MentoringPage.clickSubmitButton()
		MentoringPage.verificarMensagemDeAlerta(
			registrationStatusMessages.success.title,
			registrationStatusMessages.success.description,
		)
	})

	it('Should Display Success Message After Successful Registration', () => {
		MentoringPage.MockRegisterFail()
		MentoringPage.visit()

		MentoringPage.fillEmailInput()
		MentoringPage.fillNameInput()
		MentoringPage.fillPhoneInput()

		MentoringPage.clickSubmitButton()
		MentoringPage.verificarMensagemDeAlerta(
			registrationStatusMessages.error.title,
			registrationStatusMessages.error.description,
		)
	})
})
