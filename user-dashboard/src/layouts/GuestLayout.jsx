// import Hero from "../components/main/Hero"
//import AutoPlayingCarousel from "../components/main/AutoPlayingCarousel"
import Landing from "../components/main/Landing"
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
      <Landing />
      {children}
    </>
  )
}
export default GuestLayout
