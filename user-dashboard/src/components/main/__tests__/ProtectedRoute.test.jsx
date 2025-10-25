import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

jest.mock('../../../utils/authUtils', () => ({ isLoggedIn: jest.fn(() => false) }))

test('redirects to home when not authenticated', () => {
  render(
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Protected</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.queryByText('Protected')).not.toBeInTheDocument()
  expect(screen.getByText('Home')).toBeInTheDocument()
})
