import Loading from "./Loading"
import {useEffect, useRef, useState, useCallback} from "react"
import {useQuery, gql} from "@apollo/client"
import {Link, useParams} from "react-router-dom"
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
  const loaderRef = useRef(null)
  const [hasMore, setHasMore] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const {data, loading, fetchMore, previousData} = useQuery(GET_BLOGS, {
    variables: {
      offset: 0,
      limit: 10,
      author: domainId,
      tagId: id ? id : null,
      published: true
    },
    notifyOnNetworkStatusChange: true
  })

  const blogs = data?.blogs?.blog || previousData?.blogs?.blog || []

  useEffect(() => {
    const savedScrollY = sessionStorage.getItem("scrollY")
    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY))
    }
    return () => {
      sessionStorage.setItem("scrollY", window.scrollY)
    }
  }, [])

  const loadMore = useCallback(() => {
    if (isFetchingMore || !hasMore) return
    setIsFetchingMore(true)
    fetchMore({
      variables: {
        offset: blogs.length,
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
  }, [fetchMore, blogs.length, id, domainId, hasMore, isFetchingMore])

  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting) {
          loadMore()
        }
      },
      {threshold: 1.0}
    )
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [loadMore])

  if (loading && blogs.length === 0) return <Loading />

  return (
    <>
      {window.history.length > 2 && id && <BackButton />}
      {blogs.map(blog => (
        <div className="p-3 mb-9 shadow-md" key={blog.id}>
          <div className="flex flex-col">
            <div className="italic self-end">
              {new Date(parseInt(blog.createdAt)).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </div>

            <div className="text-base-content text-base md:text-xl font-bold mb-4">
              {blog.title}
            </div>

            <div
              className="text-base-content prose dark:prose-invert prose-sm sm:prose-base lg:prose-sm xl:prose-base m-5 focus:outline-none"
              dangerouslySetInnerHTML={{
                __html:
                  blog.content.length > 200
                    ? blog.content.substring(0, 200) + "..."
                    : blog.content
              }}
            />

            <div className="mt-5 self-end">
              <Link to={`/blog/${blog.id}`}>
                <button className="bg-neutral text-neutral-content btn btn-outline btn-xs">
                  Read more
                </button>
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

      {hasMore && <div ref={loaderRef} style={{height: 50}} />}

      {isFetchingMore && <Loading />}
      {!hasMore && (
        <div className="text-center mt-5 text-sm opacity-70">
          No more blogs to show.
        </div>
      )}
    </>
  )
}

export default BlogScroll
