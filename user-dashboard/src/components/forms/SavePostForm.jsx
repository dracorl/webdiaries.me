import {useForm} from "react-hook-form"
import {useMutation, gql} from "@apollo/client"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Switch} from "@/components/ui/switch"
import TagSelector from "../TagSelector"
import {zodResolver} from "@hookform/resolvers/zod"
import {SavePostFormSchema} from "./Schema"
import {useModal} from "../../contexts/ModalContext"

const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlog(
    $title: String!
    $content: String!
    $tags: [ID]
    $published: Boolean!
  ) {
    createBlog(
      title: $title
      content: $content
      tags: $tags
      published: $published
    ) {
      id
    }
  }
`

const SavePostForm = ({editorContent}) => {
  const navigate = useNavigate()
  const [createBlog] = useMutation(CREATE_BLOG_MUTATION)
  const {closeModal} = useModal()

  const form = useForm({
    resolver: zodResolver(SavePostFormSchema),
    defaultValues: {
      title: "",
      tags: [],
      isPublished: false
    }
  })

  const onSubmit = async values => {
    try {
      const {data} = await createBlog({
        variables: {
          title: values.title,
          content: editorContent,
          tags: values.tags.map(tag => tag.value),
          published: values.isPublished
        }
      })

      toast.success("Blog post saved successfully")
      closeModal()
      navigate("/posts")
    } catch (error) {
      console.error("Save error", error)
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-2xl mx-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter title"
                  {...field}
                  className="text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <TagSelector
                  selected={field.value}
                  onSelect={selectedTags => field.onChange(selectedTags)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublished"
          render={({field}) => (
            <div className="flex items-center gap-4 pt-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-primary"
                />
              </FormControl>
              <span className="font-medium">
                {field.value ? "Publish" : "Save as draft"}
              </span>
            </div>
          )}
        />

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="submit"
            className="min-w-[120px]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SavePostForm
