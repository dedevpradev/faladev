import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Input from '@/components/shared/Input'
import '@testing-library/jest-dom/extend-expect'

describe('Componente Input', () => {
  test('renderiza o input com label', () => {
    render(<Input label="Username" name="username" type="text" value="" onChange={() => {}} />)
    const labelElement = screen.getByText(/username/i)
    expect(labelElement).toBeInTheDocument()
    const inputElement = screen.getByLabelText(/username/i)
    expect(inputElement).toBeInTheDocument()
  })

  test('renderiza o input com placeholder', () => {
    render(<Input label="Username" name="username" type="text" value="" placeholder="Enter username" onChange={() => {}} />)
    const inputElement = screen.getByPlaceholderText(/enter username/i)
    expect(inputElement).toBeInTheDocument()
  })

  test('trata eventos de mudança', () => {
    const handleChange = vi.fn()
    render(<Input label="Username" name="username" type="text" value="" onChange={handleChange} />)
    const inputElement = screen.getByLabelText(/username/i)
    fireEvent.change(inputElement, { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('exibe mensagem de erro quando a prop error é fornecida', () => {
    render(<Input label="Username" name="username" type="text" value="" onChange={() => {}} error="This field is required" />)
    const errorMessage = screen.getByText(/this field is required/i)
    expect(errorMessage).toBeInTheDocument()
  })

  test('adiciona classes de erro quando a prop error é fornecida', () => {
    render(<Input label="Username" name="username" type="text" value="" onChange={() => {}} error="This field is required" />)
    const inputElement = screen.getByLabelText(/username/i)
    expect(inputElement).toHaveClass('border-red-500')
  })
})
