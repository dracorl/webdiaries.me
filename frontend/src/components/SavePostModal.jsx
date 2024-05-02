import TagSelector from "./TagSelector"
import {useState, useEffect} from "react"

const SavePostModal = () => {
  const [selected, setSelected] = useState([])
  const [title, setTitle] = useState("")
  const [isChecked, setIsChecked] = useState(true)

  useEffect(() => {
    console.log("publish", isChecked)
  }, [isChecked])

  const handleCheck = () => {
    setIsChecked(!isChecked)
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleSave = () => {
    console.log("Title:", title)
    console.log("Publish:", isChecked)
    console.log("Tags:", selected)
    document.getElementById("savePostModal").close()
  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="savePostModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-secondary">
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
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </label>
              <TagSelector selected={selected} setSelected={setSelected} />
              <div className="join">
                <input
                  className="join-item btn w-3/6"
                  type="radio"
                  name="options"
                  aria-label="Publish"
                  onChange={handleCheck}
                  checked={isChecked}
                />
                <input
                  className="join-item btn w-3/6"
                  type="radio"
                  name="options"
                  aria-label="Just save"
                  checked={!isChecked}
                  onChange={handleCheck}
                />
              </div>

              <div className="flex justify-evenly">
                <button
                  onClick={handleSave}
                  className="btn btn-wide btn-primary mr-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
export default SavePostModal
