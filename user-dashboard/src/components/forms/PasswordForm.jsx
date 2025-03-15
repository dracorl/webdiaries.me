import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation, gql} from "@apollo/client"
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
import {PasswordFormSchema} from "./Schema"

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($password: String!) {
    updateUser(password: $password) {
      id
    }
  }
`

const PasswordForm = () => {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const form = useForm({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async values => {
    try {
      await updateUser({variables: {password: values.password}})
      toast.success("Password updated successfully")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
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
export default PasswordForm
