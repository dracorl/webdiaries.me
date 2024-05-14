import {useState} from "react"
import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import SavePostForm from "../forms/SavePostForm"

const CRETAE_BLOG_MUTATION = gql`
  mutation CreateBlog($title: String!, $content: String!, $tags: [ID]) {
    createBlog(title: $title, content: $content, tags: $tags) {
      id
    }
  }
`

const SavePostModal = ({editorContent}) => {
  const [selected, setSelected] = useState([])
  const [title, setTitle] = useState("")
  const [isChecked, setIsChecked] = useState(true)
  const navigate = useNavigate()

  const [createBlog] = useMutation(CRETAE_BLOG_MUTATION)

  const handleSave = async e => {
    e.preventDefault()
    try {
      await createBlog({
        variables: {
          title,
          content: editorContent,
          tags: selected.map(tag => tag.value)
        }
      })
      toast.success("Blog post saved successfully")
      navigate("/posts")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
    document.getElementById("savePostModal").close()
  }

  return (
    <dialog id="savePostModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <h2 className="text-2xl text-center">Save Blog Post</h2>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="modal-action justify-center">
          <SavePostForm
            handleSave={handleSave}
            selected={selected}
            setSelected={setSelected}
            title={title}
            setTitle={setTitle}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
      </div>
    </dialog>
  )
}
export default SavePostModal
