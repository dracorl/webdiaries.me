import Drawer from "../components/main/Drawer"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {ModalProvider} from "../contexts/ModalContext"
const MainLayout = () => {
  return (
    <ModalProvider>
      <ToastContainer />
      <Drawer />
    </ModalProvider>
  )
}
export default MainLayout
