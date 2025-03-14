import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useQuery, useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"
import {BioFormSchema} from "./Schema"
import {useEffect} from "react"

// GraphQL Sorguları
const GET_USER_BIO_QUERY = gql`
  query User {
    user {
      bio
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($bio: String) {
    updateUser(bio: $bio) {
      id
    }
  }
`

const BioForm = () => {
  const {data} = useQuery(GET_USER_BIO_QUERY)
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const form = useForm({
    resolver: zodResolver(BioFormSchema),
    defaultValues: {
      bio: data?.user?.bio || ""
    }
  })

  useEffect(() => {
    if (data?.user?.bio) {
      form.reset({bio: data.user.bio})
    }
  }, [data, form.reset])

  const onSubmit = async values => {
    try {
      await updateUser({
        variables: {
          bio: values.bio
        }
      })
      toast.success("Bio updated successfully")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="bio"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-right">
                {field.value?.length || 0}/500 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </Form>
  )
}

export default BioForm
