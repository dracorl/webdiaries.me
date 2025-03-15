import {useCurrentEditor} from "@tiptap/react"
import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Separator} from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  List,
  ListOrdered,
  Quote,
  CodeSquare,
  Minus,
  WrapText,
  Undo2,
  Redo2,
  Save
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

const TipTapMenuBar = ({openModal}) => {
  const {editor} = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2 p-2 border rounded-lg bg-background">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive("bold") ? "default" : "outline"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Bold (Ctrl+B)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive("italic") ? "default" : "outline"}
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Italic (Ctrl+I)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive("strike") ? "default" : "outline"}
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Strikethrough (Ctrl+Shift+X)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive("code") ? "default" : "outline"}
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Inline Code (Ctrl+E)</p>
            </TooltipContent>
          </Tooltip>

          {/* Headings Dropdown */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={
                        editor.isActive("heading") ? "default" : "outline"
                      }
                      size="sm"
                    >
                      <Heading1 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[1, 2, 3, 4, 5, 6].map(level => (
                      <DropdownMenuItem
                        key={level}
                        onClick={() =>
                          editor.chain().focus().toggleHeading({level}).run()
                        }
                        className={
                          editor.isActive("heading", {level}) ? "bg-accent" : ""
                        }
                      >
                        H{level}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Headings</p>
            </TooltipContent>
          </Tooltip>

          {/* Lists */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive("bulletList") ? "default" : "outline"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Bullet List (Ctrl+Shift+8)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive("orderedList") ? "default" : "outline"}
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Ordered List (Ctrl+Shift+7)</p>
            </TooltipContent>
          </Tooltip>

          {/* Blocks */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive("blockquote") ? "default" : "outline"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Blockquote (Ctrl+Shift+B)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive("codeBlock") ? "default" : "outline"}
                size="sm"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <CodeSquare className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Code Block (Ctrl+Alt+C)</p>
            </TooltipContent>
          </Tooltip>

          {/* Utilities */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Horizontal Rule</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().setHardBreak().run()}
              >
                <WrapText className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Line Break (Shift+Enter)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Undo (Ctrl+Z)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Redo (Ctrl+Y)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                onClick={openModal}
                className="gap-1"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Save Post (Ctrl+S)</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default TipTapMenuBar
