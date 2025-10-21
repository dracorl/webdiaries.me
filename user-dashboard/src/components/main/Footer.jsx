import {Link} from "react-router-dom"
import {FaGithub, FaTwitter, FaInstagram, FaHeart} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="shadow-[0_-5px_10px_rgba(0,0,0,0.2)] footer p-10 bg-gray-200 text-neutral-content flex justify-between ">
      <nav></nav>
      <nav className="gap-10 flex justify-between text-center">
        <Link
          to="https://x.com/dracorllll"
          target="_blank"
          className="link link-hover"
        >
          <FaTwitter className="inline text-xl lg:mr-1" />
          Twitter
        </Link>
        <Link
          to="https://www.instagram.com/ykslngn/"
          target="_blank"
          className="link link-hover"
        >
          <FaInstagram className="inline text-xl lg:mr-1" />
          Instagram
        </Link>
        <Link
          to="https://github.com/dracorl"
          target="_blank"
          className="link link-hover"
        >
          <FaGithub className="inline text-xl lg:mr-1" />
          Github
        </Link>
      </nav>
    </footer>
  )
}
export default Footer
