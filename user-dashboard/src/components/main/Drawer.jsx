import Navbar from "./Navbar"
import Footer from "./Footer"
import Menu from "./Menu"
import {Outlet} from "react-router-dom"

const Drawer = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen flex flex-col">
        {/* Page content here */}
        <Navbar />
        <Outlet />
        <Footer />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <Menu />
        </ul>
      </div>
    </div>
  )
}
export default Drawer
