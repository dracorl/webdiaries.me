import mainLogo from "/icon.svg"
import {useState, useEffect} from "react"
import {clearTokens} from "../../utils/authUtils"
import {useNavigate, Link} from "react-router-dom"
import {useAuth} from "../../contexts/AuthContext"
import {Button} from "@/components/ui/button"
import {TypeAnimation} from "react-type-animation"
import {useModal} from "../../contexts/ModalContext"
import LoginModal from "../modals/LoginModal"

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const {loggedIn, logout, getUsername} = useAuth()
  const [username, setUsername] = useState(null)
  const {openModal} = useModal()

  useEffect(() => {
    const fetchUsername = async () => {
      const result = await getUsername()
      setUsername(result)
    }

    fetchUsername()
  }, [getUsername])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const loginAction = () => {
    openModal(() => <LoginModal />)
  }
  const logoutAction = () => {
    console.log("Logging out")
    clearTokens()
    logout()
    navigate("/")
  }

  return (
    <div className="navbar bg-background font-thin font-mono text-xs shadow-md">
      <div className="flex-1">
        {loggedIn && (
          <>
            <Link to={`https://${username}.webdiaries.me`} target="_blank">
              <img src={mainLogo} className="logo react max-w-12" />
            </Link>
            <Link to={`https://${username}.webdiaries.me`} target="_blank">
              <TypeAnimation
                className="ml-5"
                sequence={[`https://${username}.webdiaries.me`, 1000, "", 1000]}
                speed={50}
                repeat={Infinity}
              />
            </Link>{" "}
          </>
        )}
        {!loggedIn && (
          <TypeAnimation
            sequence={["write to live", 1000, "live to write", 1000]}
            speed={50}
            repeat={Infinity}
          />
        )}
      </div>

      <div className="flex-none">
        {loggedIn && (
          <div>
            <a onClick={logoutAction} className="btn btn-ghost text-xl">
              Log Out
            </a>
            <label
              tabIndex={0}
              role="label"
              onClick={toggleSidebar}
              htmlFor="my-drawer"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        )}
        {!loggedIn && (
          <>
            <Button onClick={loginAction} variant="ghost">
              LOG IN
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
export default Navbar
