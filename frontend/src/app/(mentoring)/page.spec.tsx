import { fireEvent, RenderResult, waitFor } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { IMentoringAgendaService } from '@/services/MentoringAgenda/MentoringAgenda.service'
import { changeInput } from '@/tests/changeInput'
import {
	failedMentoringServiceMock,
	successfulMentoringServiceMock,
} from '@/tests/mock/mentoringServiceMock'
import { mockSchemaMentoringTypeData } from '@/tests/mock/mockSchemaMentoringTypeData'
import { renderView } from '@/tests/renderView'

import { useMentoringModel } from './mentoring.model'
import { MentoringView } from './mentoring.view'
import { registrationStatusMessages } from './registrationStatusMessages'

type MakeSutProps = {
	service?: IMentoringAgendaService
}

const MakeSut = ({ service = successfulMentoringServiceMock }: MakeSutProps) => {
	const methods = useMentoringModel(service)
	return <MentoringView {...methods} />
}

type SubmitFormParams = {
	screen: RenderResult
	title: string
	description: string
}

const SubmitForm = async (params: SubmitFormParams) => {
	const { description, screen, title } = params

	const emailInput = screen.container.querySelector('#email') as HTMLInputElement
	changeInput({ input: emailInput, valueInput: mockSchemaMentoringTypeData.email })

	const nameInput = screen.container.querySelector('#name') as HTMLInputElement
	changeInput({ input: nameInput, valueInput: mockSchemaMentoringTypeData.name })

	const phoneInput = screen.container.querySelector('#phone') as HTMLInputElement
	changeInput({ input: phoneInput, valueInput: mockSchemaMentoringTypeData.phone })

	const buttonSubmit = screen.getByTestId('button-submit')
	fireEvent.click(buttonSubmit)

	const formSubmit = screen.getByTestId('form-mentoring')
	await waitFor(() => formSubmit)

	const alertTitle = screen.getByTestId('alert-title')
	expect(alertTitle.textContent).toBe(title)

	const alertDescription = screen.getByTestId('alert-description')
	expect(alertDescription.textContent).toBe(description)
}

describe('<MentoringPage />', () => {
	test('displays all error messages on form submission', async () => {
		const screen = renderView(<MakeSut />)

		const buttonSubmit = screen.getByTestId('button-submit')
		fireEvent.click(buttonSubmit)

		const formSubmit = screen.getByTestId('form-mentoring')
		await waitFor(() => formSubmit)

		const errorMessage = screen.getAllByTestId('error-message')
		expect(errorMessage.length).toBe(3)
	})
	test('Should display error messages after invalid email submission', async () => {
		const screen = renderView(<MakeSut />)

		const buttonSubmit = screen.getByTestId('button-submit')
		fireEvent.click(buttonSubmit)

		const formSubmit = screen.getByTestId('form-mentoring')
		await waitFor(() => formSubmit)

		const emailInput = screen.container.querySelector('#email') as HTMLInputElement
		changeInput({ input: emailInput, valueInput: mockSchemaMentoringTypeData.email })
		fireEvent.click(buttonSubmit)
		await waitFor(() => formSubmit)

		const errorMessage = screen.getAllByTestId('error-message')
		expect(errorMessage.length).toBe(2)
	})

	test('should display a single error message after submitting form with invalid email and name', async () => {
		const screen = renderView(<MakeSut />)

		const buttonSubmit = screen.getByTestId('button-submit')
		fireEvent.click(buttonSubmit)

		const formSubmit = screen.getByTestId('form-mentoring')
		await waitFor(() => formSubmit)

		const emailInput = screen.container.querySelector('#email') as HTMLInputElement
		changeInput({ input: emailInput, valueInput: mockSchemaMentoringTypeData.email })

		const nameInput = screen.container.querySelector('#name') as HTMLInputElement
		changeInput({ input: nameInput, valueInput: mockSchemaMentoringTypeData.name })
		fireEvent.click(buttonSubmit)
		await waitFor(() => formSubmit)

		const errorMessage = screen.getAllByTestId('error-message')
		expect(errorMessage.length).toBe(1)
	})

	test('should display success alert with correct title and description on successful form submission', async () => {
		const screen = renderView(<MakeSut />)

		await SubmitForm({
			screen,
			title: registrationStatusMessages.success.title,
			description: registrationStatusMessages.success.description,
		})
	})

	test('displays error messages on failed mentoring submission', async () => {
		const screen = renderView(<MakeSut service={failedMentoringServiceMock} />)

		await SubmitForm({
			screen,
			title: registrationStatusMessages.error.title,
			description: registrationStatusMessages.error.description,
		})
	})
})
