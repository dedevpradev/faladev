import { fireEvent } from '@testing-library/react'
import { expect } from 'vitest'

type ChangeInputProps = {
	input: HTMLInputElement
	valueInput: string
}

export const changeInput = ({ input, valueInput }: ChangeInputProps) => {
	fireEvent.change(input, { target: { value: valueInput } })
	expect(input.value).toBe(valueInput)
}
