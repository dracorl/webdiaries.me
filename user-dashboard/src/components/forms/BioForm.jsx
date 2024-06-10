import {useEffect, useState} from "react"
import {useQuery, useMutation, gql} from "@apollo/client"
import {toast} from "react-toastify"

const GET_USER_BIO_QUERY = gql`
  query User {
    user {
      bio
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($bio: String) {
    updateUser(bio: $bio) {
      id
    }
  }
`

const BioForm = () => {
  const {data} = useQuery(GET_USER_BIO_QUERY)
  const [bio, setBio] = useState(null)
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  useEffect(() => {
    if (data?.user?.bio) setBio(data?.user?.bio)
  }, [data])

  const handleSave = async e => {
    e.preventDefault()
    console.log(bio)
    try {
      await updateUser({
        variables: {
          bio
        }
      })
      toast.success("Bio updated successfully")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={handleSave} className="flex-col flex gap-3">
      <div className="text-lg self-center">About yourself</div>
      <textarea
        placeholder="About me"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        onChange={e => setBio(e.target.value)}
        value={bio || ""}
        required
      ></textarea>
      <button type="submit" className="btn btn-outline btn-sm place-self-end">
        Save
      </button>
    </form>
  )
}
export default BioForm
