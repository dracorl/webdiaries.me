import {FaArrowLeft} from "react-icons/fa"
import {useNavigate} from "react-router-dom"

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center md:-ml-4 pb-4 mt-4"
    >
      <FaArrowLeft size={25} />
      <div className="ml-2 text-2xl font-bold">Back</div>
    </button>
  )
}
export default BackButton
