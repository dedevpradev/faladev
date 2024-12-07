import { MutationOptions, useMutation } from '@tanstack/react-query'
import { IUserService, UserRegisterData } from '@/services/User/User.service'

type MutationProps = {
  service: IUserService
} & Omit<MutationOptions<string, Error, UserRegisterData>, 'mutationFn'>

// TODO: abstrair para useMudation -> usar generics para desacoplar hook do domínio
export const useMutationUser = ({
  service,
  ...mutationProps
}: MutationProps) => {
  return useMutation<string, Error, UserRegisterData>({
    mutationFn: data => service.RegisterUser(data),
    ...mutationProps,
  })
}
