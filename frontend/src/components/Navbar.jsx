import Search from "./Search"
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 md:relative w-full navbar bg-base-300 z-50 shadow-sm">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="left-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-1 lg:hidden">
          <Link to="/" className="btn btn-ghost text-xl font-thin italic">
            {window.location.hostname.split(".")[0]}
          </Link>
        </div>
        <div className="flex-none items-center w-full hidden lg:flex">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl font-thin italic">
              {window.location.hostname.split(".")[0]}
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Search />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="pt-16 block md:hidden"></div>
      {/* This div is to push the content down to avoid being covered by the navbar */}
    </>
  )
}
export default Navbar
