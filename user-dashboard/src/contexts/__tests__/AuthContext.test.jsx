import React from "react"
import {render, screen} from "@testing-library/react"
import {act} from "react-dom/test-utils"
import {AuthProvider, useAuth} from "../AuthContext"

jest.mock("../../utils/authUtils", () => ({
  isLoggedIn: jest.fn(() => false),
  isTokenExpired: jest.fn(() => false),
  clearTokens: jest.fn(),
  getUsername: jest.fn()
}))

function TestComponent() {
  const {loggedIn, login, logout} = useAuth()
  return (
    <div>
      <span>status:{loggedIn ? "in" : "out"}</span>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

test("provides default logged out state and login/logout toggles", async () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  )

  expect(screen.getByText(/status:\s*out/)).toBeInTheDocument()

  act(() => {
    screen.getByText("login").click()
  })

  // wait for state update
  expect(await screen.findByText(/status:\s*in/)).toBeInTheDocument()

  act(() => {
    screen.getByText("logout").click()
  })

  expect(await screen.findByText(/status:\s*out/)).toBeInTheDocument()
})
