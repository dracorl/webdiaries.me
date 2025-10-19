import {Button} from "@/components/ui/button"
import {motion} from "framer-motion"
import BlogCard from "./BlogCard"
import {useModal} from "../../contexts/ModalContext"
import SignUpForm from "../forms/SignUpForm"
import {useAuth} from "@/contexts/AuthContext"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"

const blogs = [
  {
    title: "Retro Tutkunları İçin: Commodore 64 Tamiri Nasıl Yapılır?",
    description:
      "Commodore 64'ünüzü Hayata Döndürmek: Adım Adım Tamir Rehberi...",
    date: "Dec 22, 2024",
    readTime: "5 min read",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Commodore-64-Computer-FL.png",
    link: "https://enginyuksel.webdiaries.online/blog/67bf4071923c224bfbf33503"
  },
  {
    title: "Best Anytime Baked Chicken Meatballs",
    description: "These baked chicken meatballs are the BEST!",
    date: "Sep 7, 2024",
    readTime: "7 min read",
    imageUrl:
      "https://pinchofyum.com/cdn-cgi/image/width=680,height=99999,fit=scale-down/wp-content/uploads/Baked-Chicken-Meatballs-with-Sauce.jpg",
    link: "https://delicious.webdiaries.online/blog/67d77474923c224bfbf34341"
  },
  {
    title: "Tibet Travel Tips: A First-Timer's Guide",
    description: "Everything you need to know before visiting Tibet",
    date: "Sep 10, 2024",
    readTime: "7 min read",
    imageUrl: "https://media.odynovotours.com/article/30000/tibet_27710.jpg",
    link: "https://travellersguide.webdiaries.online/blog/67d785c9923c224bfbf343af"
  }
]

export default function Landing() {
  const {loggedIn} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) navigate("/posts")
  }, [loggedIn])
  const {openModal} = useModal()
  const signUpAction = () => {
    openModal("Sign Up", "Create an account to start writing", <SignUpForm />)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Share Your Thoughts
              <span className="text-blue-600 block mt-2">Freely</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.5}}
            className="mb-12"
          >
            <WritingHandSVG className="w-64 h-64 md:w-80 md:h-80" />
          </motion.div>

          <div className="space-y-4">
            <Button
              onClick={signUpAction}
              className="relative z-10 text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
            >
              Start for Free
            </Button>
            <p className="text-gray-600 text-sm mt-2">
              Creating an account takes just 30 seconds
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<PenSVG className="w-12 h-12" />}
            title="Easy Writing"
            description="Simple and fast writing experience with Markdown support"
          />
          <FeatureCard
            icon={<BlogSVG className="w-12 h-12" />}
            title="Customizable Blog"
            description="Create your unique blog with theme and layout tools"
          />
          <FeatureCard
            icon={<AnalyticsSVG className="w-12 h-12" />}
            title="Detailed Analytics"
            description="Track reader statistics and performance metrics"
          />
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Blogs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, item) => (
            <BlogCard key={item} {...blog} />
          ))}
        </div>
      </section>
    </div>
  )
}

// SVG Components
const WritingHandSVG = ({className}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <motion.path
      d="M12 19.5V12M9 17L3 11L10 3L15 5.5M21 11L15 5.5M15 5.5L12 8"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{pathLength: 0}}
      animate={{pathLength: 1}}
      transition={{duration: 2, repeat: Infinity}}
    />
  </svg>
)

const PenSVG = ({className}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M13 7L17 3M21 7L17 3M17 3L19 12C19 12 15.9706 12 15 12C12.5 12 11 13.25 11 15C11 18 13 21 17 21C20 21 21 19 21 15C21 10 19 7 16 7C14 7 13 9 13 9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const BlogSVG = ({className}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M12 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12M9 15H15M9 9H15M9 12H12M16 3.00098L21 8.00098M16 3L11 8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const AnalyticsSVG = ({className}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M3 3V19H21M7 15V11M11 15V7M15 15V13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Reusable Components
const FeatureCard = ({icon, title, description}) => (
  <motion.div
    whileHover={{scale: 1.05}}
    className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/20"
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)
