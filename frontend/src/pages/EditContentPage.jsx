import {useQuery, gql} from "@apollo/client"
import {useState} from "react"
import Tiptap from "../components/Tiptap"
import {useParams} from "react-router-dom"
import EditContentModal from "../components/EditContentModal"
import Loading from "../components/Loading"

const CONTENT_QUERY = gql`
  query Blog($blogId: ID!) {
    blog(id: $blogId) {
      id
      content
      title
      tags {
        id
        name
      }
    }
  }
`

//I passed the blogId param to EditContentModal but it is undefined in that component???
const EditContentPage = () => {
  const [editorContent, setEditorContent] = useState("")
  const {blogId} = useParams()
  const {data, loading} = useQuery(CONTENT_QUERY, {
    variables: {blogId},
    fetchPolicy: "network-only", // "cache-first" is the default,
    onCompleted: data => {
      setEditorContent(data.blog.content)
    }
  })
  const openModal = "editContentModal"

  if (!loading && data) {
    const currentTags = data.blog.tags
      ? data.blog.tags.map(tag => ({value: tag.id, label: tag.name}))
      : []
    return (
      <div className="mx-2 my-4 divide-y min-h-screen">
        <Tiptap
          openModal={openModal}
          editorContent={data.blog.content}
          setEditorContent={setEditorContent}
        />
        <EditContentModal
          updateBlogId={data.blog.id}
          currentTags={currentTags}
          currentTitle={data.blog.title}
          editorContent={editorContent}
        />
      </div>
    )
  }
  return (
    <div className="h-screen relative">
      <Loading />
    </div>
  )
}
export default EditContentPage
