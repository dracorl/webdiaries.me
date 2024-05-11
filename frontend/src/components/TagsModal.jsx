import {useQuery, useMutation, gql} from "@apollo/client"
import {useEffect, useState} from "react"
import {toast} from "react-toastify"
import TagSelector from "./TagSelector"
import Loading from "./Loading"

const TAGS_QUERY = gql`
  query Blog($blogId: ID!) {
    blog(id: $blogId) {
      tags {
        id
        name
      }
    }
  }
`

const UPDATE_TAGS_MUTATION = gql`
  mutation UpdateBlog($updateBlogId: ID!, $tags: [ID]) {
    updateBlog(id: $updateBlogId, tags: $tags) {
      id
    }
  }
`

const TagsModal = ({blogId}) => {
  const [selected, setSelected] = useState([])
  const {data, refetch: refetchTags} = useQuery(TAGS_QUERY, {
    variables: {blogId}
  })
  const [updateBlog, {loading}] = useMutation(UPDATE_TAGS_MUTATION)

  const handleSave = async e => {
    e.preventDefault()
    try {
      const tags = selected.map(tag => tag.value)
      await updateBlog({variables: {updateBlogId: blogId, tags}})
      toast.success("Tags updated successfully")
      await refetchTags()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update tags")
    }
    document.getElementById("tagsModal").close()
  }
  useEffect(() => {
    const currentTags = data?.blog?.tags
      ? data?.blog?.tags.map(tag => ({value: tag.id, label: tag.name}))
      : []
    setSelected(currentTags)
  }, [data, blogId])

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <dialog id="tagsModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box min-h-96">
          <form method="dialog">
            <h2 className="text-2xl text-center">Set Your Tags</h2>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSave}>
            <div className="modal-action justify-center">
              <TagSelector selected={selected} setSelected={setSelected} />
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
export default TagsModal
