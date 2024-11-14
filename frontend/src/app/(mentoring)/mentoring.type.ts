import { z } from 'zod'

import { SchemaMentoring } from './mentoring.schema'

export type Status = 'error' | 'success' | null

export type FormState = {
	status: Status
	message?: {
		title?: string
		description?: string
	}
}


export type SchemaMentoringType = z.infer<typeof SchemaMentoring>
