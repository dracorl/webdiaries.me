import {useState} from "react"
import Tiptap from "../components/Tiptap"
import SavePostModal from "../components/SavePostModal"

const CreateBlogPost = () => {
  const [editorContent, setEditorContent] = useState("")
  const openModal = "savePostModal"
  return (
    <div className="mx-2 my-4 divide-y min-h-screen">
      <Tiptap openModal={openModal} setEditorContent={setEditorContent} />
      <SavePostModal editorContent={editorContent} />
    </div>
  )
}
export default CreateBlogPost
