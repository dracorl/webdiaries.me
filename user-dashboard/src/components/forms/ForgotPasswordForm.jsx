import {useState} from "react"
import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotToken($email: String!) {
    forgotToken(email: $email)
  }
`

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("")
  const [forgotToken] = useMutation(FORGOT_PASSWORD_MUTATION)

  const handleSave = async e => {
    e.preventDefault()
    try {
      await forgotToken({
        variables: {
          email
        }
      })
      toast.success("Email sent for password reset successfully")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSave} className="flex-col flex gap-3 items-center">
      <div className="text-lg self-center">Email</div>
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs"
        onChange={e => setEmail(e.target.value)}
        value={email || ""}
        required
      />

      <button type="submit" className="btn btn-outline btn-sm">
        Send Reset Password Request
      </button>
    </form>
  )
}
export default ForgotPasswordForm
