import reactLogo from "../assets/react.svg"
import {useState} from "react"

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const signInAction = () => {
    document.getElementById("loginModal").showModal()
  }
  return (
    <div className="navbar bg-indigo-700 px-5 shadow-md">
      <div className="flex-1">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="flex-none">
        {isLogged && (
          <div>
            <a
              onClick={() => setIsLogged(false)}
              className="btn btn-ghost text-xl"
            >
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
        {!isLogged && (
          <a onClick={signInAction} className="btn btn-ghost text-xl">
            Sign In
          </a>
        )}
      </div>
    </div>
  )
}
export default Navbar
