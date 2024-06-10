const BioForm = () => {
  return (
    <>
      <div className="text-lg self-center">About yourself</div>
      <textarea
        placeholder="About me"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
      ></textarea>
      <button className="btn btn-outline btn-sm place-self-end">Save</button>
    </>
  )
}
export default BioForm
