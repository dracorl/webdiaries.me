import LoginModal from "../components/LoginModal"
import SignUpModal from "../components/SignUpModal"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
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
