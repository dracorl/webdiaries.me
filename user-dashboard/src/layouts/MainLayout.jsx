import Drawer from "../components/main/Drawer"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Drawer />
    </>
  )
}
export default MainLayout
