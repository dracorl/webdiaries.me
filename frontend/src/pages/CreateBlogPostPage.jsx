import {useState} from "react"
import Tiptap from "../components/Tiptap"
import SavePostModal from "../components/SavePostModal"

const CreateBlogPost = () => {
  const [editorContent, setEditorContent] = useState("")
  return (
    <div className="mx-2 my-4 divide-y">
      <Tiptap setEditorContent={setEditorContent} />
      <SavePostModal editorContent={editorContent} />
    </div>
  )
}
export default CreateBlogPost
