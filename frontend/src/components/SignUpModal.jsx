import SignUpForm from "./SignUpForm"

const SignUpModal = () => {
  return (
    <>
      <dialog id="signUpModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <h2 className="text-2xl text-center">Sign Up</h2>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="modal-action justify-center">
            <SignUpForm />
          </div>
        </div>
      </dialog>
    </>
  )
}
export default SignUpModal
