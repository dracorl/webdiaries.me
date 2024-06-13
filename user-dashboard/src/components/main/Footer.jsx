import {Link} from "react-router-dom"
import {FaGithub, FaTwitter, FaInstagram, FaHeart} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content flex justify-between ">
      <nav>
        <div className="text-center">
          Made with <FaHeart className="lg:ml-1 inline text-red-600" />
        </div>
      </nav>
      <nav className="gap-10 flex justify-between text-center">
        <Link
          to="https://github.com/dracorlll"
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
          to="https://github.com/dracorlll"
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
