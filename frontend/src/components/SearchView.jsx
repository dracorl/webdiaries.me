import Loading from "./Loading"
import {useEffect, useCallback, useState} from "react"
import {useQuery, gql} from "@apollo/client"
import {Link, useSearchParams} from "react-router-dom"
import BackButton from "./BackButton"
import {useDomain} from "../contexts/DomainContext"

const SEARCH_BLOGS = gql`
  query SearchBlogs(
    $author: ID!
    $searchTerm: String!
    $limit: Int!
    $offset: Int!
  ) {
    searchBlogs(
      author: $author
      searchTerm: $searchTerm
      limit: $limit
      offset: $offset
    ) {
      totalCount
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

const SearchView = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("search")
  const domainId = useDomain()

  const [hasMore, setHasMore] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const {data, loading, fetchMore} = useQuery(SEARCH_BLOGS, {
    variables: {
      offset: 0,
      limit: 10,
      author: domainId,
      searchTerm
    }
  })

  useEffect(() => {
    console.log(searchTerm, data)
  }, [searchTerm, data])
  const handleScroll = useCallback(() => {
    if (
      Math.round(window.innerHeight + document.documentElement.scrollTop) >=
        document.documentElement.offsetHeight - 50 &&
      !isFetchingMore &&
      hasMore
    ) {
      console.log("Fetching more blogs...")
      setIsFetchingMore(true)
      fetchMore({
        variables: {
          offset: data.searchBlogs.blog.length,
          limit: 10,
          author: domainId,
          searchTerm
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          setIsFetchingMore(false)
          if (
            !fetchMoreResult ||
            fetchMoreResult.searchBlogs.blog.length < 10
          ) {
            setHasMore(false)
            return prev
          }
          return {
            ...prev,
            searchBlogs: {
              ...prev.searchBlogs,
              blog: [
                ...prev.searchBlogs.blog,
                ...fetchMoreResult.searchBlogs.blog
              ]
            }
          }
        }
      })
    }
  }, [data, fetchMore, isFetchingMore, hasMore, searchTerm, domainId])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  if (loading) return <Loading />
  if (!data.searchBlogs.blog.length)
    return (
      <>
        <BackButton />
        <div className="text-center">No blogs found.</div>
      </>
    )

  return (
    <>
      <BackButton />

      {data.searchBlogs.blog.map(blog => (
        <div
          className="p-3 mb-9 border-x-2 border-current shadow-md"
          key={blog.id}
        >
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
export default SearchView
