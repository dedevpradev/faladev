import { SchemaMentoringType } from '@/app/(mentoring)/mentoring.type'
import { HttpClient, HttpMethod } from '@/infra/http/HttpClient.types'

export interface IMentoringAgendaService {
	SignUpMentoring: (data: SchemaMentoringType) => Promise<string>
}

export class MentoringAgendaService implements IMentoringAgendaService {
	constructor(private readonly httpClient: HttpClient) {}

	async SignUpMentoring(userData: SchemaMentoringType): Promise<string> {
		const rsponse = await this.httpClient.request<string>({
			endpoint: '/events',
			method: HttpMethod.POST,
			body: userData,
		})
		return rsponse
	}
}
