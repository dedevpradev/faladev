
import { IUserService, UserRegisterData } from '@/services/User/User.service'

export class MockUserService implements IUserService {
  RegisterUser: () => Promise<string> = vi.fn()
}
