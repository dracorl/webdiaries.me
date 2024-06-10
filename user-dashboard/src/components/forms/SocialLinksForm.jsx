const SocialLinksForm = () => {
  return (
    <>
      <div className="text-lg self-center">Social Links</div>
      <input
        type="url"
        className="grow input input-bordered flex"
        placeholder="Social Media"
      />
      <input
        type="url"
        className="grow input input-bordered flex"
        placeholder="Social Media"
      />
      <input
        type="url"
        className="grow input input-bordered flex"
        placeholder="Social Media"
      />
      <input
        type="url"
        className="grow input input-bordered flex"
        placeholder="Social Media"
      />
      <button className="btn btn-outline btn-sm place-self-end">Save</button>
    </>
  )
}
export default SocialLinksForm
