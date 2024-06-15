import {useEffect, useState} from "react"
import {useQuery, useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const GET_USER_LINKS_QUERY = gql`
  query User {
    user {
      links {
        name
        url
      }
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($links: [LinkInput]) {
    updateUser(links: $links) {
      id
    }
  }
`

const SocialLinksForm = () => {
  const {data} = useQuery(GET_USER_LINKS_QUERY)
  const [links, setLinks] = useState([{name: "", url: ""}])
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  useEffect(() => {
    if (data?.user?.links)
      // eslint-disable-next-line no-unused-vars
      setLinks(data.user.links.map(({__typename, ...link}) => link))
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
      {links.map((link, index) => (
        <div key={index} className="join">
          <input
            type="text"
            className="input input-bordered join-item"
            placeholder="Name"
            value={link.name || ""}
            onChange={e => {
              let newLinks = [...links]
              newLinks[index] = {...newLinks[index], name: e.target.value}
              setLinks(newLinks)
            }}
            required={link.url && link.url.length > 0}
          />
          <input
            type="url"
            className="input input-bordered join-item"
            placeholder="Social Media"
            value={link.url || ""}
            onChange={e => {
              let newLinks = [...links]
              newLinks[index] = {...newLinks[index], url: e.target.value}
              setLinks(newLinks)
            }}
            required={link.name && link.name.length > 0}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-outline btn-sm place-self-end">
        Save
      </button>
    </form>
  )
}
export default SocialLinksForm
