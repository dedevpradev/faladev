import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { MentoringView } from '@/app/(mentoring)/mentoring.view'
import '@testing-library/jest-dom/extend-expect'

// Mock the MentoringAgendaService
vi.mock('@/services/MentoringAgenda/MentoringAgenda.service', () => {
  return {
    MentoringAgendaService: vi.fn().mockImplementation(() => {
      return {
        SignUpMentoring: vi.fn().mockResolvedValue('success')
      }
    })
  }
})

describe('MentoringView Component', () => {
  test('renders the form with inputs and button', () => {
    render(<MentoringView />)

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument()
    expect(screen.getByText(/Quero participar/i)).toBeInTheDocument()
  })

  test('shows error messages on form validation failure', async () => {
    render(<MentoringView />)

    fireEvent.submit(screen.getByRole('button', { name: /Quero participar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/E-mail é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/Telefone é obrigatório/i)).toBeInTheDocument()
    })
  })

  test('submits the form successfully when validation passes', async () => {
    render(<MentoringView />)

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'john.doe@example.com' } })
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: '1234567890' } })

    fireEvent.submit(screen.getByRole('button', { name: /Quero participar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Formulário enviado com sucesso!/i)).toBeInTheDocument()
    })
  })

  test('resets the form after successful submission', async () => {
    render(<MentoringView />)

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'john.doe@example.com' } })
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: '1234567890' } })

    fireEvent.submit(screen.getByRole('button', { name: /Quero participar/i }))

    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/i)).toHaveValue('')
      expect(screen.getByLabelText(/E-mail/i)).toHaveValue('')
      expect(screen.getByLabelText(/Telefone/i)).toHaveValue('')
    })
  })
})
