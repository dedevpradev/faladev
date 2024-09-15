import { HttpClient } from '@/infra/http/HttpClient.types'
export const mockResponse = 'Success'

export const httpClientMockSuccess: HttpClient = {
	request: vi.fn().mockResolvedValue(mockResponse),
}

export const httpClientMockFail: HttpClient = {
	request: vi.fn().mockRejectedValue(new Error('Network error')),
}
