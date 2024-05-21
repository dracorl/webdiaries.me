import Loading from "./Loading"
import {useEffect, useCallback, useState} from "react"
import {useQuery, gql} from "@apollo/client"
import {Link, useLocation} from "react-router-dom"

const GET_BLOGS = gql`
  query Blogs(
    $limit: Int!
    $offset: Int!
    $username: String
    $published: Boolean
  ) {
    blogs(
      limit: $limit
      offset: $offset
      username: $username
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
  const {data, loading, fetchMore} = useQuery(GET_BLOGS, {
    variables: {offset: 0, limit: 10, username: "enginyuksel", published: true}
  })

  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const {pathname} = useLocation()

  useEffect(() => {
    // Scroll position is restored only when navigating back to the blog list
    if (pathname === "/") {
      const savedScrollPosition = sessionStorage.getItem("scrollPosition")
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10))
      }
    }
  }, [pathname])

  const handleClick = () => {
    // Save the current scroll position when a blog is clicked
    console.log("Saving scroll position", window.scrollY)
    sessionStorage.setItem("scrollPosition", window.scrollY.toString())
  }
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      !isFetchingMore
    ) {
      setIsFetchingMore(true)
      fetchMore({
        variables: {
          offset: data.blogs.blog.length,
          limit: 10,
          username: "enginyuksel",
          published: true
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          setIsFetchingMore(false)
          if (!fetchMoreResult) return prev
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
  }, [data, fetchMore, isFetchingMore])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  if (loading) return <Loading />

  return (
    <>
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

            <div className="text-xl font-bold mb-4">{blog.title}</div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  blog.content.length > 200
                    ? blog.content.substring(0, 200) + "..."
                    : blog.content
              }}
            />
            <div className="mt-5 self-end">
              <Link to={`/blog/${blog.id}`}>
                <button
                  onClick={handleClick}
                  className="btn btn-outline btn-xs"
                >
                  Read more
                </button>
              </Link>
            </div>
            <div className="mt-5">
              {blog.tags.map(tag => (
                <button key={tag.id} className="mr-px btn btn-outline btn-xs">
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
      {isFetchingMore && <Loading />}
    </>
  )
}

export default BlogScroll
