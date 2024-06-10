import {useEffect, useState} from "react"
import {useQuery, useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const GET_USER_LINKS_QUERY = gql`
  query User {
    user {
      links
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($links: [String]) {
    updateUser(links: $links) {
      id
    }
  }
`

const SocialLinksForm = () => {
  const {data} = useQuery(GET_USER_LINKS_QUERY)
  const [links, setLinks] = useState(["", "", "", ""])
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  useEffect(() => {
    if (data?.user?.links) setLinks(data?.user?.links)
  }, [data])

  const handleSave = async e => {
    e.preventDefault()
    console.log({
      variables: {
        links
      }
    })
    try {
      await updateUser({
        variables: {
          links
        }
      })
      toast.success("Links updated successfully")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSave} className="flex-col flex gap-3">
      <div className="text-lg self-center">Social Links</div>
      <input
        type="url"
        className="grow input input-bordered flex"
        placeholder="Social Media"
        value={links[0]}
        onChange={e => {
          let newLinks = [...links]
          newLinks[0] = e.target.value
          setLinks(newLinks)
        }}
      />
      <input
        type="url"
        className="grow input input-bordered flex"
        placeholder="Social Media"
        value={links[1]}
        onChange={e => {
          let newLinks = [...links]
          newLinks[1] = e.target.value
          setLinks(newLinks)
        }}
      />
      <input
        type="url"
        className="grow input input-bordered flex"
        placeholder="Social Media"
        value={links[2]}
        onChange={e => {
          let newLinks = [...links]
          newLinks[2] = e.target.value
          setLinks(newLinks)
        }}
      />
      <input
        type="url"
        className="grow input input-bordered flex"
        placeholder="Social Media"
        value={links[3]}
        onChange={e => {
          let newLinks = [...links]
          newLinks[3] = e.target.value
          setLinks(newLinks)
        }}
      />
      <button type="submit" className="btn btn-outline btn-sm place-self-end">
        Save
      </button>
    </form>
  )
}
export default SocialLinksForm
