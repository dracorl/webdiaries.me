import TagSelector from "./TagSelector"
import {useState, useEffect} from "react"
import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

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

  useEffect(() => {
    console.log("publish", isChecked)
  }, [isChecked])

  const handleCheck = () => {
    setIsChecked(!isChecked)
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleSave = async e => {
    e.preventDefault()
    console.log("Title:", title)
    console.log("Publish:", isChecked)
    console.log("Tags:", selected)
    console.log("Content:", editorContent)
    try {
      await createBlog({
        variables: {
          title,
          content: editorContent,
          tags: selected.map(tag => tag.value)
        }
      })
      toast.success("Blog post saved successfully")
      document.getElementById("savePostModal").close()
      navigate("/posts")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
    document.getElementById("savePostModal").close()
  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="savePostModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-secondary">
          <form method="dialog">
            <h2 className="text-2xl text-center">Save Blog Post</h2>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="modal-action justify-center">
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <label className="input input-bordered flex items-center gap-2">
                  Title
                  <input
                    type="text"
                    className="grow"
                    placeholder="Be creative!"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </label>
                <TagSelector selected={selected} setSelected={setSelected} />
                <div className="join">
                  <input
                    className="join-item btn w-3/6"
                    type="radio"
                    name="options"
                    aria-label="Publish"
                    onChange={handleCheck}
                    checked={isChecked}
                  />
                  <input
                    className="join-item btn w-3/6"
                    type="radio"
                    name="options"
                    aria-label="Just save"
                    checked={!isChecked}
                    onChange={handleCheck}
                  />
                </div>

                <div className="flex justify-evenly">
                  <button
                    type="submit"
                    className="btn btn-wide btn-primary mr-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
export default SavePostModal
