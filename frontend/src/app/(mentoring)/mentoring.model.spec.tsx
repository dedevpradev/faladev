/* eslint-disable import/order */
import { renderWithQueryClient } from '@/tests/renderWithQueryClient'
import { waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import { useMentoringModel } from './mentoring.model'
import {
	failedMentoringServiceMock,
	successfulMentoringServiceMock,
} from '@/tests/mock/mentoringServiceMock'
import { mockSchemaMentoringTypeData } from '@/tests/mock/mockSchemaMentoringTypeData'
import { registrationStatusMessages } from '../../shared/registrationStatusMessages'

describe('useMentoringModel', () => {
	it('should return initial state', () => {
		const { result } = renderWithQueryClient(() =>
			useMentoringModel(successfulMentoringServiceMock),
		)
		expect(result.current.registrationResult).toBeNull()
		expect(result.current.errors).toEqual({})
		expect(result.current.isSubmitting).toBe(false)
	})

	it('should set registrationResult to success on successful submission', async () => {
		const { result } = renderWithQueryClient(() =>
			useMentoringModel(successfulMentoringServiceMock),
		)
		result.current.handleSubmitMentoring(mockSchemaMentoringTypeData)
		await waitFor(() => {
			expect(result.current.registrationResult).toEqual(registrationStatusMessages.success)
		})
	})

	it('should set registrationResult to error on failed submission', async () => {
		const { result } = renderWithQueryClient(() => useMentoringModel(failedMentoringServiceMock))
		result.current.handleSubmitMentoring(mockSchemaMentoringTypeData)
		await waitFor(() => {
			expect(result.current.registrationResult).toEqual(registrationStatusMessages.error)
		})
	})

	it('should return errors from useForm', () => {
		const { result } = renderWithQueryClient(() =>
			useMentoringModel(successfulMentoringServiceMock),
		)
		const errors = {}
		expect(result.current.errors).toEqual(errors)
	})
})
