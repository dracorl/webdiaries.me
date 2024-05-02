import {useState} from "react"
import {FaAt, FaKey, FaUser} from "react-icons/fa"
import {useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const CREATE_MUTATION = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      email
      username
    }
  }
`

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [createUser] = useMutation(CREATE_MUTATION)

  const handleSignUp = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    try {
      const response = await createUser({
        variables: {email, username, password}
      })
      console.log("User created:", response.data.createUser)
      toast.success("User created successfully")
      document.getElementById("signUpModal").close()
      document.getElementById("loginModal").showModal()
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSignUp}>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <FaAt className="w-4 h-4 opacity-70 sm:w-4 sm:h-4 sm:opacity-100" />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <FaUser className="w-4 h-4 opacity-70 sm:w-4 sm:h-4 sm:opacity-100" />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required={true}
            />
          </label>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <FaKey className="w-4 h-4 opacity-70" />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <FaKey className="w-4 h-4 opacity-70" />
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex justify-evenly">
          <button type="submit" className="btn btn-primary mr-2">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
