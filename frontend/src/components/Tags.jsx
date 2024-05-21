import Loading from "./Loading"
import {useQuery, gql} from "@apollo/client"

const TAGS_COUNT = gql`
  query TagsCount($username: String!) {
    tagsCount(username: $username) {
      id
      name
      count
    }
  }
`

const Tags = () => {
  const {data, loading} = useQuery(TAGS_COUNT, {
    variables: {username: "enginyuksel"}
  })

  if (loading) return <Loading />

  return (
    <div className="grid-flow-row-dense">
      {data.tagsCount.map(tag => (
        <button key={tag.id} className="mr-px btn btn-outline btn-xs">
          {tag.name} ({tag.count})
        </button>
      ))}
    </div>
  )
}

export default Tags
