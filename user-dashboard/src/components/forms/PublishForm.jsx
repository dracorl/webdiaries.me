import {useMutation, gql} from "@apollo/client"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import {toast} from "react-toastify"
import {useModal} from "@/contexts/ModalContext"

const UPDATE_BLOG = gql`
  mutation UpdateBlogPublishStatus($id: ID!, $published: Boolean!) {
    updateBlog(id: $id, published: $published) {
      id
      published
    }
  }
`

const PublishForm = ({blogId, checkedStates, setCheckedStates}) => {
  const [updateBlog] = useMutation(UPDATE_BLOG)
  const form = useForm()
  const {closeModal} = useModal()

  const handleSubmit = async () => {
    try {
      await updateBlog({
        variables: {
          id: blogId,
          published: !checkedStates[blogId]
        }
      })
      setCheckedStates(prevStates => ({
        ...prevStates,
        [blogId]: !prevStates[blogId]
      }))
      closeModal()
      toast.success(
        checkedStates[blogId]
          ? "Post unpublished successfully"
          : "Post published successfully"
      )
    } catch (error) {
      console.error("Publish error:", error)
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="text-center text-lg mb-6">
          Are you sure you want to{" "}
          {checkedStates[blogId] ? "unpublish" : "publish"} this post?
        </div>
        <div className="flex justify-center gap-4">
          <Button type="submit" variant="destructive">
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PublishForm
