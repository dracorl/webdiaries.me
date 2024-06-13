// AuthContext.js
import {createContext, useContext, useState} from "react"
import {isLoggedIn, getUsername} from "../utils/authUtils"

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)
const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  const login = () => {
    setLoggedIn(true)
  }

  const logout = () => {
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{loggedIn, getUsername, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth}
