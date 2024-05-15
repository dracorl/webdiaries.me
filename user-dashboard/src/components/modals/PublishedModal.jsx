import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const UPDATE_BLOG = gql`
  mutation Mutation($updateBlogId: ID!, $published: Boolean) {
    updateBlog(id: $updateBlogId, published: $published) {
      id
    }
  }
`

const PublishedModal = ({blogId, checkedStates, setCheckedStates}) => {
  const [updateBlog] = useMutation(UPDATE_BLOG)
  const handlePublish = async e => {
    e.preventDefault()
    let update = {
      variables: {
        updateBlogId: blogId,
        published: checkedStates[blogId]
      }
    }
    // console.log("publishedModal blogId: ", blogId)
    // console.log("publishedModal checkedStates: ", checkedStates[blogId])
    console.log("publishedModal update: ", update)
    try {
      await updateBlog({
        variables: {
          updateBlogId: blogId,
          published: checkedStates[blogId]
        }
      })
      toast.success("Blog post updated successfully")
    } catch (error) {
      console.error(error)
      setCheckedStates(prevStates => ({
        ...prevStates,
        [blogId]: !prevStates[blogId]
      }))
      toast.error(error.message)
    }
    document.getElementById("publishedModal").close()
  }

  return (
    <dialog id="publishedModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <h2 className="text-2xl text-center">Are you sure?</h2>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handlePublish}>
          <div className="modal-action justify-center">
            <button type="submit" className="btn btn-primary">
              YES
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
export default PublishedModal
