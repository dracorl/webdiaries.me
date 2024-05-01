import {useState} from "react"
import {FaAt, FaKey} from "react-icons/fa"
import {useMutation, gql} from "@apollo/client"
import {saveTokens} from "../utils/authUtils"

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [login] = useMutation(LOGIN_MUTATION)

  const handleLogin = async e => {
    e.preventDefault()
    console.log("Logging in...", email, password)
    try {
      const response = await login({variables: {email, password}})
      saveTokens(
        response.data.login.accessToken,
        response.data.login.refreshToken
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
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
            />
          </label>
        </div>
        <div className="flex justify-evenly">
          <button type="button" className="btn btn-primary mr-2">
            Sign Up
          </button>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
