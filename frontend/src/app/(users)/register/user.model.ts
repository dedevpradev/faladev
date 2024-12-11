'use client'

import { IUserService, UserRegisterData, type UserService } from "@/services/User/User.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema } from "./user.schema";
import { registrationStatusMessages } from "@/shared/registrationStatusMessages";
import { useMutationUser } from "@/Mutate/useUserMutation";
import { useState } from "react";
import { RegistrationResult } from "./types";

export const useUserModel = (userService: IUserService) => {
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationResult>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(UserSchema),
  })

  const handleUserRegister = handleSubmit((data: UserRegisterData) => registerUser(data))

  const { mutate: registerUser } = useMutationUser({
    service: userService,
    onError: () => setRegistrationStatus(registrationStatusMessages.error),
    onSuccess: () => setRegistrationStatus(registrationStatusMessages.success),
  })

  return {  
    register,
    errors,
    isSubmitting,
    handleUserRegister,
    registrationStatus
  }
}


