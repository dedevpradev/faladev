'use client'

import { UserRegisterData, type UserService } from "@/services/UserService/User.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema } from "./user.schema";


export const useUserModel = (userService: UserService) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(UserSchema),
  })

  return {
    register,
    errors,
    isSubmitting
  }
}


