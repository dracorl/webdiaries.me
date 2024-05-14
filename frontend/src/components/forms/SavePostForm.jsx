import TagSelector from "../TagSelector"

const SavePostForm = ({
  handleSave,
  selected,
  setSelected,
  title,
  setTitle,
  isChecked,
  setIsChecked
}) => {
  return (
    <form onSubmit={handleSave}>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <label className="input input-bordered flex items-center gap-2">
          Title
          <input
            type="text"
            className="grow"
            placeholder="Be creative!"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <TagSelector selected={selected} setSelected={setSelected} />
        <div className="join">
          <input
            className="join-item btn w-3/6"
            type="radio"
            name="options"
            aria-label="Publish"
            onChange={() => setIsChecked(!isChecked)}
            checked={isChecked}
          />
          <input
            className="join-item btn w-3/6"
            type="radio"
            name="options"
            aria-label="Just save"
            checked={!isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </div>
        <div className="flex justify-evenly">
          <button type="submit" className="btn btn-wide btn-primary mr-2">
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
export default SavePostForm
