import {useState} from "react"
import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($password: String) {
    updateUser(password: $password) {
      id
    }
  }
`

const PasswordForm = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const handleSave = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    try {
      await updateUser({
        variables: {
          password
        }
      })
      toast.success("Password updated successfully")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSave} className="flex-col flex gap-3">
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
      <button
        type="submit"
        className="btn btn-outline btn-sm join-item place-self-end"
      >
        Update Password
      </button>
    </form>
  )
}
export default PasswordForm
