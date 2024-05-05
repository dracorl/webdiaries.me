// AuthContext.js
import {createContext, useContext, useState, useEffect} from "react"
import {isLoggedIn} from "../utils/authUtils"

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)
const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  useEffect(() => {
    console.log("Logged in:", loggedIn)
  }, [loggedIn])

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
