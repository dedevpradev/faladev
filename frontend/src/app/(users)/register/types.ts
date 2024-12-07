import { z } from 'zod'

import { UserSchema } from './user.schema'

export type Status = 'error' | 'success'

export type RegistrationResult = {
  title: string
  description: string
  status: Status
}

export type SchemaUserType = z.infer<typeof UserSchema>
