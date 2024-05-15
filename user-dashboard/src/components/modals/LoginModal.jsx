import LoginForm from "../forms/LoginForm"

const LoginModal = () => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="loginModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <h2 className="text-2xl text-center">Jump In</h2>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="modal-action justify-center">
            <LoginForm />
          </div>
        </div>
      </dialog>
    </>
  )
}
export default LoginModal
