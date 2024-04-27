import Typing from "./Typing"
import heroImage from "../assets/hero-image.jpg"

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroImage})`
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-6xl">
          <h1 className="mb-5 text-5xl font-bold"> Become a Blogger: </h1>
          <Typing />
          <br />
          <button className="mt-6 btn btn-primary">Create your blog</button>
        </div>
      </div>
    </div>
  )
}
export default Hero
