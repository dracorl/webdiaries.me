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
  FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {EmailFormSchema} from "./Schema"
import {useEffect} from "react"

const GET_USER_EMAIL_QUERY = gql`
  query User {
    user {
      email
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($email: String!) {
    updateUser(email: $email) {
      id
    }
  }
`

const EmailForm = () => {
  const {data} = useQuery(GET_USER_EMAIL_QUERY)
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const form = useForm({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: data?.user?.email || ""
    }
  })

  useEffect(() => {
    if (data?.user?.email) {
      form.reset({email: data.user.email})
    }
  }, [data, form.reset])

  const onSubmit = async values => {
    try {
      await updateUser({variables: {email: values.email}})
      toast.success("Email updated successfully")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Update
        </Button>
      </form>
    </Form>
  )
}
export default EmailForm
