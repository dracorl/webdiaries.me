// import "../tiptap.css"
import {Color} from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import {EditorProvider, useCurrentEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const savePostAction = () => {
  document.getElementById("savePostModal").showModal()
}

const MenuBar = () => {
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
        onClick={savePostAction}
        className="m-0.5 btn btn-outline btn-primary btn-wide"
      >
        Save
      </button>
    </div>
  )
}

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

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

const Tiptap = () => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none"
        }
      }}
    ></EditorProvider>
  )
}

export default Tiptap
