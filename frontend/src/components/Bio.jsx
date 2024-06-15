import Loading from "./Loading"
import {useQuery, gql} from "@apollo/client"
import {Link} from "react-router-dom"
import BackButton from "./BackButton"
import {useDomain} from "../contexts/DomainContext"

const BIO_QUERY = gql`
  query User($userId: ID) {
    user(id: $userId) {
      bio
      links {
        url
        name
      }
    }
  }
`

const Bio = () => {
  const domainId = useDomain()

  const {data, loading} = useQuery(BIO_QUERY, {
    variables: {
      userId: domainId
    }
  })

  if (loading) return <Loading />
  if (!data) return <Loading />
  return (
    <>
      <BackButton />
      <div className="p-3 mb-9 mt-10">
        <div className="flex flex-col items-center">
          <div className="text-base-content text-center prose-xl md:prose-2xl font-bold mb-4">
            About Me
          </div>
          <div className="text-center mt-10 text-base-content prose dark:prose-invert prose-sm sm:prose-base lg:prose-sm xl:prose-base focus:outline-none">
            {data.user.bio}
          </div>
          <div className="mt-5 flex">
            {data.user.links.map((link, index) => (
              <div key={index}>
                <Link to={link.url}>
                  <button className="mr-2 btn btn-outline btn-xs">
                    {link.name}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Bio
