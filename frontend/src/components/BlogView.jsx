import Loading from "./Loading"
import {useQuery, gql} from "@apollo/client"
import {Link, useParams} from "react-router-dom"
import {FaArrowLeft} from "react-icons/fa"

const GET_BLOG = gql`
  query Blog($blogId: ID!) {
    blog(id: $blogId) {
      id
      title
      content
      tags {
        name
        id
      }
      createdAt
    }
  }
`

const BlogView = () => {
  const {id} = useParams()
  const {data, loading} = useQuery(GET_BLOG, {
    variables: {blogId: id}
  })

  if (loading) return <Loading />

  return (
    <>
      <Link to="/" className="flex items-center -ml-4 pb-4 mt-4">
        <FaArrowLeft size={25} />
        <div className="ml-2 text-2xl font-bold">Back</div>
      </Link>

      <div className="p-3 mb-9 mt-10">
        <div className="flex flex-col">
          <div className="italic self-end">
            {new Date(parseInt(data.blog.createdAt)).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              }
            )}
          </div>

          <div className="text-center text-3xl font-bold mb-4">
            {data.blog.title}
          </div>
          <div
            className="mt-10"
            dangerouslySetInnerHTML={{
              __html: data.blog.content
            }}
          />
          <div className="mt-5">
            {data.blog.tags.map(tag => (
              <button key={tag.id} className="mr-px btn btn-outline btn-xs">
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default BlogView
