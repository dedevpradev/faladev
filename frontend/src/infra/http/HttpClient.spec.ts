import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { HttpAxiosAdapter } from './HttpClient'
import { HttpMethod, HttpRequest } from './HttpClient.types'


// Mock do axios
vi.mock('axios', () => ({
	default: {
		request: vi.fn(),
	},
}))

describe('HttpAxiosAdapter', () => {
	// @ts-expect-error
	let mockAxios: { request: vi.Mock }
	let httpClient: HttpAxiosAdapter

	beforeEach(() => {
		// @ts-expect-error
		mockAxios = axios as unknown as { request: vi.Mock }
		httpClient = new HttpAxiosAdapter(mockAxios as unknown as AxiosInstance)
	})

	it('should return data when request is successful', async () => {
		const responseData = { success: true }
		const request: HttpRequest = {
			endpoint: '/test',
			method: HttpMethod.GET,
		}
		// @ts-expect-error
		;(mockAxios.request as vi.Mock).mockResolvedValueOnce({
			data: responseData,
		} as AxiosResponse<typeof responseData>)

		const result = await httpClient.request<typeof responseData>(request)

		expect(result).toEqual(responseData)
		expect(mockAxios.request).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			headers: undefined,
			data: undefined,
			url: 'http://localhost:8080/api/test',
		})
	})

	it('should handle POST requests with body and headers', async () => {
		const responseData = { success: true }
		const request: HttpRequest = {
			endpoint: '/submit',
			method: HttpMethod.POST,
			body: { key: 'value' },
			headers: { 'Content-Type': 'application/json' },
		}
		// @ts-expect-error
		;(mockAxios.request as vi.Mock).mockResolvedValueOnce({
			data: responseData,
		} as AxiosResponse<typeof responseData>)

		const result = await httpClient.request<typeof responseData>(request)

		expect(result).toEqual(responseData)
		expect(mockAxios.request).toHaveBeenCalledWith({
			method: HttpMethod.POST,
			headers: { 'Content-Type': 'application/json' },
			data: { key: 'value' },
			url: 'http://localhost:8080/api/submit',
		})
	})

	it('should throw an error when the request fails', async () => {
		const request: HttpRequest = {
			endpoint: '/error',
			method: HttpMethod.GET,
		}

		const errorMessage = 'Request failed'
		const errorResponse = {
			response: {
				status: 500,
				data: errorMessage,
			},
		}
		// @ts-expect-error
		;(mockAxios.request as vi.Mock).mockRejectedValueOnce(errorResponse as AxiosError)

		await expect(httpClient.request(request)).rejects.toThrow(
			`Request failed with status 500: ${errorMessage}`,
		)

		expect(mockAxios.request).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			headers: undefined,
			data: undefined,
			url: 'http://localhost:8080/api/error',
		})
	})

	it('should handle network errors', async () => {
		const request: HttpRequest = {
			endpoint: '/network-error',
			method: HttpMethod.GET,
		}

		const networkError = new Error('Network Error')
		// @ts-expect-error
		;(mockAxios.request as vi.Mock).mockRejectedValueOnce(networkError)

		await expect(httpClient.request(request)).rejects.toThrow(
			`Request failed with status undefined: Network Error`,
		)

		expect(mockAxios.request).toHaveBeenCalledWith({
			method: HttpMethod.GET,
			headers: undefined,
			data: undefined,
			url: 'http://localhost:8080/api/network-error',
		})
	})

	it('should handle requests with no headers and body', async () => {
		const responseData = { success: true }
		const request: HttpRequest = {
			endpoint: '/no-header-no-body',
			method: HttpMethod.DELETE,
		}
		// @ts-expect-error
		;(mockAxios.request as vi.Mock).mockResolvedValueOnce({
			data: responseData,
		} as AxiosResponse<typeof responseData>)

		const result = await httpClient.request<typeof responseData>(request)

		expect(result).toEqual(responseData)
		expect(mockAxios.request).toHaveBeenCalledWith({
			method: HttpMethod.DELETE,
			headers: undefined,
			data: undefined,
			url: 'http://localhost:8080/api/no-header-no-body',
		})
	})
})
