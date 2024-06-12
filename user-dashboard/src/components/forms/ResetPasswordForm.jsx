import {useState} from "react"
import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"
import {useParams, useNavigate} from "react-router-dom"

const RESET_PASSWORD_MUTATION = gql`
  mutation UpdateUser($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      id
    }
  }
`

const ResetPasswordForm = () => {
  const {token} = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION)

  const handleSave = async e => {
    console.log({
      variables: {
        token,
        password
      }
    })
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    try {
      await resetPassword({
        variables: {
          token,
          password
        }
      })
      toast.success("Password updated successfully")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSave} className="flex-col flex gap-3 items-center">
      <div className="text-lg self-center">Change Passsword</div>
      <input
        type="password"
        placeholder="New Password"
        className="input input-bordered w-full max-w-xs"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password Again"
        className="input input-bordered w-full max-w-xs"
        name="confirmPassword"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-outline btn-sm join-item">
        Update Password
      </button>
    </form>
  )
}
export default ResetPasswordForm
