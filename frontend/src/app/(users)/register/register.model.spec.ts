import { renderHook } from "@testing-library/react"
import { useUserModel } from "./user.model"
import { MockUserService } from "@/tests/mock/userServiceMock"
import { renderWithQueryClient } from "@/tests/renderWithQueryClient"
import { expect } from "vitest"

describe('useUserModel', () => {
  it('should return correct initial state', () => {
    const mockService = new MockUserService()
    const { result } = renderWithQueryClient(() => useUserModel(mockService))

    expect(result.current.isSubmitting).equal(false)
    expect(result.current.errors).toEqual({})
    expect(result.current.registrationStatus).toBeUndefined()
  })
})
