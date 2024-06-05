import Loading from "./Loading"
import {useEffect, useCallback, useState} from "react"
import {useQuery, gql, NetworkStatus} from "@apollo/client"
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {useDomain} from "../contexts/DomainContext"
import BackButton from "./BackButton"

const GET_BLOGS = gql`
  query Blogs(
    $limit: Int!
    $offset: Int!
    $author: ID
    $tagId: ID
    $published: Boolean
  ) {
    blogs(
      limit: $limit
      offset: $offset
      author: $author
      tagId: $tagId
      published: $published
    ) {
      blog {
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
  }
`

const BlogScroll = () => {
  const domainId = useDomain()
  const {id} = useParams()
  const [hasMore, setHasMore] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const {data, loading, fetchMore, networkStatus} = useQuery(GET_BLOGS, {
    variables: {
      offset: 0,
      limit: 10,
      author: domainId,
      tagId: id ? id : null,
      published: true
    },
    notifyOnNetworkStatusChange: true
  })

  const handleScroll = useCallback(() => {
    if (
      Math.round(window.innerHeight + document.documentElement.scrollTop) >=
        document.documentElement.offsetHeight - 50 &&
      !isFetchingMore &&
      networkStatus !== NetworkStatus.fetchMore &&
      hasMore
    ) {
      setIsFetchingMore(true)
      fetchMore({
        variables: {
          offset: data.blogs.blog.length,
          limit: 10,
          author: domainId,
          tagId: id ? id : null,
          published: true
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          setIsFetchingMore(false)
          if (!fetchMoreResult || fetchMoreResult.blogs.blog.length < 10) {
            setHasMore(false)
            return prev
          }
          return {
            ...prev,
            blogs: {
              ...prev.blogs,
              blog: [...prev.blogs.blog, ...fetchMoreResult.blogs.blog]
            }
          }
        }
      })
    }
  }, [data, fetchMore, isFetchingMore, networkStatus, id, hasMore])
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  if (loading || !domainId) return <Loading />

  return (
    <>
      {window.history.length > 2 && id && <BackButton />}
      {data.blogs.blog.map(blog => (
        <div className="p-3 mb-9 border-x-2 shadow-md" key={blog.id}>
          <div className="flex flex-col">
            <div className="italic self-end">
              {new Date(parseInt(blog.createdAt)).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </div>

            <div className="text-base md:text-2xl font-bold mb-4">{blog.title}</div>
            <div className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl m-5 focus:outline-none"
              dangerouslySetInnerHTML={{
                __html:
                  blog.content.length > 200
                    ? blog.content.substring(0, 200) + "..."
                    : blog.content
              }}
            />
            <div className="mt-5 self-end">
              <Link to={`/blog/${blog.id}`}>
                <button className="btn btn-outline btn-xs">Read more</button>
              </Link>
            </div>
            <div className="mt-5">
              {blog.tags.map(tag => (
                <Link key={tag.id + blog.id} to={`/tag/${tag.id}`}>
                  <button className="mr-px btn btn-outline btn-xs">
                    {tag.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
      {isFetchingMore && hasMore && <Loading />}
      {!hasMore && <div className="text-center">No more blogs to show.</div>}
    </>
  )
}

export default BlogScroll
