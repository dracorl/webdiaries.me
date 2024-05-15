import LoginModal from "../components/modals/LoginModal"
import SignUpModal from "../components/modals/SignUpModal"
import Hero from "../components/main/Hero"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../contexts/AuthContext"
const GuestLayout = ({children}) => {
  const navigate = useNavigate()
  const {loggedIn} = useAuth() // replace with your actual auth context method

  useEffect(() => {
    console.log("isLoggedIn", loggedIn)
    if (loggedIn) navigate("/posts")
  }, [loggedIn, navigate])

  return (
    <>
      <Hero />
      {children}
      <LoginModal />
      <SignUpModal />
    </>
  )
}
export default GuestLayout