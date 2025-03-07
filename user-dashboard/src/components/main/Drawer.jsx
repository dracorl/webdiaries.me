import Navbar from "./Navbar"
import Footer from "./Footer"
import Menu from "./Menu"
import { Outlet } from "react-router-dom"
import { AuroraBackground } from "@/components/ui/aurora-background";
const Drawer = () => {
  return (
    <div className="drawer overflow-x-hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen flex flex-col">
        {/* Page content here */}
        <Navbar />
        <main className="flex-1 relative">
          <AuroraBackground className="min-h-[calc(100vh-6rem)]"> {/* Navbar ve Footer yüksekliğini düşürdük */}
            <div className="container mx-auto px-4 py-8">
              <Outlet />
            </div>
          </AuroraBackground>
        </main>
        <Footer />
      </div>
      <div className="drawer-side w-64">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <Menu />
        </ul>
      </div>
    </div>
  )
}
export default Drawer
