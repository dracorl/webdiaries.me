import {useState} from "react"
import TipTap from "../components/TipTap"
import SavePostModal from "../components/modals/SavePostModal"

const CreateBlogPost = () => {
  const [editorContent, setEditorContent] = useState("")
  const openModal = "savePostModal"
  return (
    <div className="mx-2 my-4 divide-y min-h-screen">
      <TipTap openModal={openModal} setEditorContent={setEditorContent} />
      <SavePostModal editorContent={editorContent} />
    </div>
  )
}
export default CreateBlogPost
