import {useMutation, gql} from "@apollo/client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "react-toastify"
import {deleteSchema} from "@/components/forms/Schema"
import {useModal} from "@/contexts/ModalContext"

const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`

const DeleteForm = ({blogId, onSuccess}) => {
  const {closeModal} = useModal()
  const [deleteBlog] = useMutation(DELETE_BLOG)
  const form = useForm({
    resolver: zodResolver(deleteSchema)
  })

  const onSubmit = async () => {
    try {
      await deleteBlog({variables: {id: blogId}})
      onSuccess()
      closeModal()
      toast.success("Blog post deleted successfully")
    } catch (error) {
      console.error("Deletion error:", error)
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center text-lg mb-4">
          Confirm deletion by typing "delete" below
        </div>

        <FormField
          control={form.control}
          name="confirmation"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Type "delete" to confirm'
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center gap-4">
          <Button
            type="submit"
            variant="destructive"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Deleting..." : "Confirm Deletion"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default DeleteForm
