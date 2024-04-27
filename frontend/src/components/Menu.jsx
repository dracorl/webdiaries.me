import {FaPlus, FaList, FaChartBar, FaCog} from "react-icons/fa"

const Menu = () => {
  return (
    <>
      <button className="btn btn-primary btn-block">
        <FaPlus className="inline text-lg mb-1 mr-1" />
        Create New Post
      </button>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <a>
            <FaList className="inline text-lg mb-1 mr-1" />
            Blogs Posts
          </a>
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
            <FaCog className="inline text-lg mb-1 mr-1" />
            Logout
          </a>
        </li>
      </ul>
    </>
  )
}
export default Menu
