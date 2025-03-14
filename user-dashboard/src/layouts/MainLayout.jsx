import {useState} from "react"
import Drawer from "../components/main/Drawer"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {ModalProvider} from "../contexts/ModalContext"
import {Outlet} from "react-router-dom"
import Navbar from "@/components/main/Navbar"
import Footer from "@/components/main/Footer"

const MainLayout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerOpenChange = open => {
    setDrawerOpen(open)
  }

  return (
    <ModalProvider>
      <ToastContainer />
      <Drawer isOpen={isDrawerOpen} onOpenChange={handleDrawerOpenChange} />
      <Navbar onDrawerOpen={() => setDrawerOpen(true)} />
      <div className="flex-1 p-4 drop-shadow-lg">
        <Outlet />
      </div>
      <Footer />
    </ModalProvider>
  )
}

export default MainLayout
