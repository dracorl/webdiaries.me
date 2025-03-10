import {useMutation, gql} from "@apollo/client"
import {saveTokens} from "../../utils/authUtils"
import {useAuth} from "../../contexts/AuthContext"
import {toast} from "react-toastify"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {LoginFormSchema} from "./Schema"

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`

const LoginForm = ({onSubmitSuccess}) => {
  const {login} = useAuth()

  const [loginMutation] = useMutation(LOGIN_MUTATION)

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async values => {
    try {
      const response = await loginMutation({variables: values})
      saveTokens(
        response.data.login.accessToken,
        response.data.login.refreshToken
      )
      onSubmitSuccess?.()
      console.log("type of onSubmitSuccess", typeof onSubmitSuccess)
      login()
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Your Email will be kept private</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                Your Password will be hashed and kept private
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="float-right" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
