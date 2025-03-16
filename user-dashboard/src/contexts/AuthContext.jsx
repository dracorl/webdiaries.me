// AuthContext.js
import {createContext, useContext, useState, useEffect} from "react"
import {
  isLoggedIn,
  getUsername,
  clearTokens,
  isTokenExpired
} from "../utils/authUtils"

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)
const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  useEffect(() => {
    const verifyToken = async () => {
      if (loggedIn) {
        const isExpired = await isTokenExpired(
          localStorage.getItem("accessToken")
        ) // Yeni bir fonksiyon ekle
        if (isExpired) {
          logout()
        }
      }
    }
    verifyToken()
  }, [loggedIn])

  const login = () => {
    setLoggedIn(true)
  }

  const logout = () => {
    setLoggedIn(false)
    clearTokens()
  }

  return (
    <AuthContext.Provider value={{loggedIn, getUsername, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth}
