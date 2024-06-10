import {useEffect, useState} from "react"
import {useQuery, useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const GET_USER_EMAIL_QUERY = gql`
  query User {
    user {
      email
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($email: String) {
    updateUser(email: $email) {
      id
    }
  }
`

const EmailForm = () => {
  const {data} = useQuery(GET_USER_EMAIL_QUERY)
  const [email, setEmail] = useState(null)
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  useEffect(() => {
    if (data?.user?.email) setEmail(data?.user?.email)
  }, [data])

  const handleSave = async e => {
    e.preventDefault()
    try {
      await updateUser({
        variables: {
          email
        }
      })
      toast.success("Email updated successfully")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSave} className="flex-col flex gap-3">
      <div className="text-lg self-center">Email</div>
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs"
        onChange={e => setEmail(e.target.value)}
        value={email || ""}
        required
      />

      <button type="submit" className="btn btn-outline btn-sm place-self-end">
        Update Mail
      </button>
    </form>
  )
}
export default EmailForm
