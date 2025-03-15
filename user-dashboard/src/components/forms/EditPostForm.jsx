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
import {EditPostFormSchema} from "./Schema"
import {useModal} from "@/contexts/ModalContext"

const UPDATE_BLOG_MUTATION = gql`
  mutation UpdateBlog(
    $id: ID!
    $title: String
    $content: String
    $tags: [ID]
    $published: Boolean
  ) {
    updateBlog(
      id: $id
      title: $title
      content: $content
      tags: $tags
      published: $published
    ) {
      id
    }
  }
`

const EditPostForm = ({blogId, currentTitle, currentTags, editorContent}) => {
  const navigate = useNavigate()
  const [updateBlog] = useMutation(UPDATE_BLOG_MUTATION)
  const {closeModal} = useModal()
  const form = useForm({
    resolver: zodResolver(EditPostFormSchema),
    defaultValues: {
      title: currentTitle,
      tags: currentTags.map(tag => ({value: tag.id, label: tag.name})),
      isPublished: true
    }
  })

  const onSubmit = async values => {
    try {
      const {data} = await updateBlog({
        variables: {
          id: blogId,
          title: values.title,
          content: editorContent,
          tags: values.tags.map(tag => tag.value),
          published: values.isPublished
        }
      })

      toast.success("Blog post updated successfully")
      closeModal()
      navigate("/posts")
    } catch (error) {
      console.error("Update error:", error)
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
                  placeholder="Blog post title"
                  {...field}
                  className="text-lg font-semibold"
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
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditPostForm
