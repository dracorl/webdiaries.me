import {useMutation, gql} from "@apollo/client"
import {useState} from "react"
import {toast} from "react-toastify"

const DELETE_MUTATION = gql`
  mutation DeleteBlog($deleteBlogId: ID!) {
    deleteBlog(id: $deleteBlogId)
  }
`

const DeleteModal = ({blogId, deleteAction}) => {
  const [deleteMutation] = useMutation(DELETE_MUTATION)
  const [deleteBlog, setDeleteBlog] = useState("")
  const handleDelete = async e => {
    e.preventDefault()
    if (deleteBlog === "delete") {
      try {
        await deleteMutation({variables: {deleteBlogId: blogId}})
        document.getElementById("deleteModal").close()
        deleteAction()
        toast.success("Blog deleted successfully")
      } catch (error) {
        console.error(error)
        toast.error(error.message)
      }
    }
  }

  return (
    <>
      <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <h2 className="text-2xl text-center">Are you sure?</h2>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleDelete}>
            <div className="modal-action justify-center">
              <input
                type="text"
                placeholder='Type "delete"'
                className="input input-bordered input-error w-full max-w-xs"
                onChange={e => setDeleteBlog(e.target.value)}
                pattern="delete"
                required
              />
              <button type="submit" className="btn btn-error">
                Delete
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
export default DeleteModal
