import {Color} from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import {EditorProvider} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TipTapMenuBar from "./TipTapMenuBar"

const extensions = [
  Color.configure({types: [TextStyle.name, ListItem.name]}),
  TextStyle.configure({types: [ListItem.name]}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  })
]

const Tiptap = ({openModal, editorContent, setEditorContent}) => {
  return (
    <EditorProvider
      slotBefore={<TipTapMenuBar openModal={openModal} />}
      extensions={extensions}
      content={editorContent}
      editorProps={{
        attributes: {
          class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl m-5 focus:outline-none"
        }
      }}
      onUpdate={({editor}) => setEditorContent(editor.getHTML())}
    ></EditorProvider>
  )
}

export default Tiptap
