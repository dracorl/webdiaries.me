import {useCurrentEditor} from "@tiptap/react"

const savePostAction = modalName => {
  document.getElementById(modalName).showModal()
}

const TipTapMenuBar = ({openModal}) => {
  const {editor} = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="pb-1.5">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        code
      </button>
      <button
        className={"m-0.5 btn btn-outline btn-sm"}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </button>
      <button
        className={"m-0.5 btn btn-outline btn-sm"}
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
        className={
          editor.isActive("heading", {level: 1})
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
        className={
          editor.isActive("heading", {level: 2})
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
        className={
          editor.isActive("heading", {level: 3})
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
        className={
          editor.isActive("heading", {level: 4})
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
        className={
          editor.isActive("heading", {level: 5})
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
        className={
          editor.isActive("heading", {level: 6})
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        blockquote
      </button>
      <button
        className={"m-0.5 btn btn-outline btn-sm"}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </button>
      <button
        className={"m-0.5 btn btn-outline btn-sm"}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </button>
      <button
        className={"m-0.5 btn btn-outline btn-sm"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        className={"m-0.5 btn btn-outline btn-sm"}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", {color: "#958DF1"})
            ? "is-active m-0.5 btn btn-outline btn-sm"
            : "m-0.5 btn btn-outline btn-sm"
        }
      >
        purple
      </button>
      <button
        onClick={() => savePostAction(openModal)}
        className="m-0.5 btn btn-outline btn-primary btn-wide"
      >
        Save
      </button>
    </div>
  )
}

export default TipTapMenuBar
