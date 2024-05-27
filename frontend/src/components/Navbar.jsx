import Search from "./Search"
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar bg-gray-200 shadow-sm">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="btn btn-ghost text-xl font-thin italic">
          {window.location.hostname.split(".")[0]}
        </Link>
        <div className="flex-1 flex justify-center">
          <Search />
        </div>
      </div>
    </div>
  )
}
export default Navbar
