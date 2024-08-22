import { z } from 'zod'
import { SchemaMentoring } from './mentoring.schema'

export type Status = 'error' | 'success'

export type RegistrationResult = {
	title: string
	description: string
	status: Status
}

export type SchemaMentoringType = z.infer<typeof SchemaMentoring>
