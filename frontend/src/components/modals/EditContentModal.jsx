import {useMutation, gql} from "@apollo/client"
import {useState} from "react"
import {toast} from "react-toastify"
import TagSelector from "../TagSelector"
import {useNavigate} from "react-router-dom"

const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $updateBlogId: ID!
    $title: String
    $content: String
    $tags: [ID]
  ) {
    updateBlog(
      id: $updateBlogId
      title: $title
      content: $content
      tags: $tags
    ) {
      id
    }
  }
`

const EditContentModal = ({
  updateBlogId,
  currentTitle,
  currentTags,
  editorContent
}) => {
  const [selected, setSelected] = useState(currentTags)
  const [title, setTitle] = useState(currentTitle)
  const [isChecked, setIsChecked] = useState(true)
  const [updateBlog] = useMutation(UPDATE_BLOG)
  const navigate = useNavigate()

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }
  const handleCheck = () => {
    setIsChecked(!isChecked)
  }
  const handleSave = async e => {
    e.preventDefault()
    console.log("Update Blog ID:", updateBlogId)
    console.log("Title:", title)
    console.log("Publish:", isChecked)
    console.log("Tags:", selected)
    console.log("Content:", editorContent)
    try {
      await updateBlog({
        variables: {
          updateBlogId,
          title,
          content: editorContent,
          tags: selected.map(tag => tag.value)
        }
      })
      toast.success("Blog post updated successfully")
      navigate("/posts")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
    document.getElementById("editContentModal").close()
  }
  return (
    <>
      <dialog
        id="editContentModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form method="dialog">
            <h2 className="text-2xl text-center">Update Blog Post</h2>
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
export default EditContentModal
