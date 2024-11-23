



import { UserSchema } from '@/app/(users)/register/user.schema'
import { HttpClient, HttpMethod } from '@/infra/http/HttpClient.types'
import { z } from 'zod'

export interface IUserService {
  RegisterUser: (data: UserRegisterData) => Promise<string>
}

export type UserRegisterData = z.infer<typeof UserSchema>

export class UserService implements IUserService {
  constructor(private readonly httpClient: HttpClient) { }

  async RegisterUser(userData: UserRegisterData): Promise<string> {
    const response = await this.httpClient.request<string>({
      endpoint: '/events', // TODO: validar endpoint
      method: HttpMethod.POST,
      body: userData,
    })

    return response
  }
}
