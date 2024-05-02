import LoginModal from "../components/LoginModal"
import SignUpModal from "../components/SignUpModal"
// import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
const GuestLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Footer />
      <LoginModal />
      <SignUpModal />
    </>
  )
}
export default GuestLayout
