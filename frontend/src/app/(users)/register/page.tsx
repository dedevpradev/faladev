'use client'

import { RegisterView } from './register.view'
import { HttpAxiosAdapter } from '@/infra/http/HttpClient'
import { UserService } from '@/services/User/User.service'
import { useUserModel } from './user.model'

export default function RegisterPage() {

	const httpAxiosAdapter = new HttpAxiosAdapter()
	const userService = new UserService(httpAxiosAdapter)
	const methods = useUserModel(userService)

	return <RegisterView {...methods} />
}
