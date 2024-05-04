// AuthContext.js
import {createContext, useContext, useState} from "react"

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)
const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false)

  const login = () => {
    setLoggedIn(true)
  }

  const logout = () => {
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{loggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth}
