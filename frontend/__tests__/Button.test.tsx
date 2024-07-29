import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Button from '@/components/shared/Button'
import '@testing-library/jest-dom/extend-expect'

describe('Componente Button', () => {
  test('renderiza o botão com o texto filho', () => {
    render(<Button>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toBeInTheDocument()
  })

  test('aplica as classes corretas de variante', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByText(/primary/i)).toHaveClass('bg-blue-500')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByText(/secondary/i)).toHaveClass('bg-gray-500')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByText(/danger/i)).toHaveClass('bg-red-500')
  })

  test('trata eventos de clique', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('desativa o botão quando a prop disabled é verdadeira', () => {
    render(<Button disabled>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toBeDisabled()
    expect(buttonElement).toHaveClass('opacity-50 cursor-not-allowed')
  })
})
