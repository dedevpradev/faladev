import { describe, test, expect } from 'vitest'

import { SchemaMentoringType } from '@/app/(mentoring)/mentoring.type'
import {
	httpClientMockFail,
	httpClientMockSuccess,
	mockResponse,
} from '@/tests/mock/httpClientMock'

import { MentoringAgendaService } from './MentoringAgenda.service'

const mockUserData: SchemaMentoringType = {
	name: 'John Doe',
	email: 'john.doe@example.com',
	phone: '1234567890',
}

describe('MentoringAgendaService', () => {
	test('should send a POST request to sign up for mentoring and return response', async () => {
		const mentoringAgendaService = new MentoringAgendaService(httpClientMockSuccess)
		const result = await mentoringAgendaService.SignUpMentoring(mockUserData)

		expect(httpClientMockSuccess.request).toHaveBeenCalledWith({
			endpoint: '/events',
			method: 'post',
			body: mockUserData,
		})

		expect(result).toBe(mockResponse)
	})

	test('should throw an error if the request fails', async () => {
		const mentoringAgendaService = new MentoringAgendaService(httpClientMockFail)

		await expect(mentoringAgendaService.SignUpMentoring(mockUserData)).rejects.toThrow(
			'Network error',
		)
	})
})
