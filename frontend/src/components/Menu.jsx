import {FaPlus, FaList, FaChartBar, FaCog, FaSignInAlt} from "react-icons/fa"
import {Link} from "react-router-dom"

const Menu = () => {
  return (
    <>
      <Link to="/create" className="btn btn-primary btn-block">
        <FaPlus className="inline text-lg mb-1 mr-1" />
        Create New Post
      </Link>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <Link to="/posts">
            <FaList className="inline text-lg mb-1 mr-1" />
            Blogs Posts
          </Link>
        </li>
        <li>
          <a>
            <FaChartBar className="inline text-lg mb-1 mr-1" />
            Statics
          </a>
        </li>
        <li>
          <a>
            <FaCog className="inline text-lg mb-1 mr-1" />
            Settings
          </a>
        </li>
        <li>
          <a>
            <FaSignInAlt className="inline text-lg mb-1 mr-1" />
            Logout
          </a>
        </li>
      </ul>
    </>
  )
}
export default Menu
