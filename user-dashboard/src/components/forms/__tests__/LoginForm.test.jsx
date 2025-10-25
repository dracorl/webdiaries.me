import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '../LoginForm'

const mockLoginMutation = jest.fn(() =>
  Promise.resolve({ data: { login: { accessToken: 'access', refreshToken: 'refresh' } } })
)

jest.mock('../../../utils/authUtils', () => ({
  saveTokens: jest.fn()
}))

jest.mock('@apollo/client', () => ({
  useMutation: () => [mockLoginMutation],
  gql: jest.fn()
}))

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({ login: jest.fn() })
}))

jest.mock('../../../contexts/ModalContext', () => ({
  useModal: () => ({ closeModal: jest.fn() })
}))

test('submits form and calls mutation + saveTokens', async () => {
  render(<LoginForm />)

  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: 'test@example.com' }
  })
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: 'password123' }
  })

  fireEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitFor(() => expect(mockLoginMutation).toHaveBeenCalled())
})
