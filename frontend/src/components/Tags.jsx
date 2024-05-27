import Loading from "./Loading"
import {useQuery, gql} from "@apollo/client"
import {Link} from "react-router-dom"
import {useDomain} from "../contexts/DomainContext"

const TAGS_COUNT = gql`
  query TagsCount($author: ID!) {
    tagsCount(author: $author) {
      id
      name
      count
    }
  }
`

const Tags = () => {
  const domainId = useDomain()
  console.log("domainId:", domainId)
  const {data, loading} = useQuery(TAGS_COUNT, {
    variables: {author: domainId}
  })
  if (loading || !domainId) return <Loading />

  return (
    <div className="grid-flow-row-dense">
      {data.tagsCount.map(tag => (
        <Link key={tag.id} to={`tag/${tag.id}`}>
          <button className="mr-px btn btn-outline btn-xs">
            {tag.name} ({tag.count})
          </button>
        </Link>
      ))}
    </div>
  )
}

export default Tags
