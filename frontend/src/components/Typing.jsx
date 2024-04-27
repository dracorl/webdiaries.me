import {TypeAnimation} from "react-type-animation"

const Typing = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Share Your Passions with the World",
        1000,
        "Unleash Your Creativity",
        1000,
        "Inspire Others with Your Insights",
        1000,
        "Explore New Ideas Every Day",
        1000,
        "Connect with Like-Minded Enthusiasts",
        1000,
        "Transform Your Experiences into Stories",
        1000,
        "Dive Deep into Your Favorite Topics",
        1000,
        "Make Your Voice Heard",
        1000,
        "Document Your Journey, Step by Step",
        1000,
        "Build Your Community of Followers",
        1000
      ]}
      speed={50}
      className="font-thin font-mono text-4xl"
      repeat={Infinity}
    />
  )
}

export default Typing
