import {useForm} from "react-hook-form"
import {useQuery, useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import TagSelector from "../TagSelector"
import {zodResolver} from "@hookform/resolvers/zod"
import Loading from "../main/Loading"
import {TagsFormSchema} from "@/components/forms/Schema"
import {useEffect} from "react"
import {useModal} from "@/contexts/ModalContext"

const TAGS_QUERY = gql`
  query Blog($blogId: ID!) {
    blog(id: $blogId) {
      tags {
        id
        name
      }
    }
  }
`

const UPDATE_TAGS_MUTATION = gql`
  mutation UpdateBlog($id: ID!, $tags: [ID!]!) {
    updateBlog(id: $id, tags: $tags) {
      id
      tags {
        id
        name
      }
    }
  }
`

const TagsForm = ({blogId}) => {
  const {data, loading: queryLoading} = useQuery(TAGS_QUERY, {
    variables: {blogId}
  })
  const {closeModal} = useModal()
  const [updateBlog, {loading: mutationLoading}] =
    useMutation(UPDATE_TAGS_MUTATION)

  const form = useForm({
    resolver: zodResolver(TagsFormSchema),
    defaultValues: {
      tags: []
    }
  })

  // Initialize form with current tags
  useEffect(() => {
    if (data?.blog?.tags) {
      form.reset({
        tags: data.blog.tags.map(tag => ({
          value: tag.id,
          label: tag.name
        }))
      })
    }
  }, [data, form])

  const onSubmit = async values => {
    try {
      await updateBlog({
        variables: {
          id: blogId,
          tags: values.tags.map(tag => tag.value)
        }
      })
      closeModal()
      toast.success("Tags updated successfully")
    } catch (error) {
      console.error("Update error:", error)
      toast.error(error.message)
    }
  }

  if (queryLoading) return <Loading />

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={mutationLoading}
            className="min-w-[120px]"
          >
            {mutationLoading ? "Saving..." : "Save Tags"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TagsForm
