const SavePostModal = () => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="savePostModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <h2 className="text-2xl text-center">Save Blog Post</h2>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="modal-action justify-center">
            <div className="grid grid-cols-1 gap-4 mt-4">
              <label className="input input-bordered flex items-center gap-2">
                Title
                <input
                  type="text"
                  className="grow"
                  placeholder="Be creative!"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Tags
                <input
                  type="text"
                  className="grow"
                  placeholder="at least one tag"
                />
              </label>
              <div className="join">
                <input
                  className="join-item btn w-3/6"
                  type="radio"
                  name="options"
                  aria-label="Publish"
                  checked
                />
                <input
                  className="join-item btn w-3/6"
                  type="radio"
                  name="options"
                  aria-label="Just save"
                />
              </div>

              <div className="flex justify-evenly">
                <button className="btn btn-wide btn-primary mr-2">Save</button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
export default SavePostModal
