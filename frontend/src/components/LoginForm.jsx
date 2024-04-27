import {FaKey, FaAt} from "react-icons/fa"

const LoginForm = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <FaAt className="w-4 h-4 opacity-70 sm:w-4 sm:h-4 sm:opacity-100" />
            <input type="text" className="grow" placeholder="Email" />
          </label>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <FaKey className="w-4 h-4 opacity-70" />
            <input type="password" className="grow" value="password" />
          </label>
        </div>
        <div className="flex justify-evenly">
          <button className="btn btn-primary mr-2">Sign Up</button>
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </>
  )
}
export default LoginForm
