import {useQuery, gql} from "@apollo/client"
import {Link} from "react-router-dom"
import {useDomain} from "../contexts/DomainContext"
import Loading from "./Loading"

const BLOGS_QUERY = gql`
  query Blogs($limit: Int!, $offset: Int!, $author: ID, $published: Boolean) {
    blogs(
      limit: $limit
      offset: $offset
      author: $author
      published: $published
    ) {
      blog {
        id
        createdAt
        title
      }
      totalCount
    }
  }
`
const listBlogs = data => {
  const blogs = data.blogs.blog

  const structuredData = {blogs: {}, totalCount: data.blogs.totalCount}

  blogs.forEach(blog => {
    const date = new Date(Number(blog.createdAt))
    const year = date.getFullYear()
    const month = date.toLocaleString("default", {month: "long"}).toLowerCase()

    if (!structuredData.blogs[year]) {
      structuredData.blogs[year] = {totalCount: 0}
    }

    if (!structuredData.blogs[year][month]) {
      structuredData.blogs[year][month] = {blog: [], totalCount: 0}
    }

    structuredData.blogs[year][month].blog.push(blog)
    structuredData.blogs[year][month].totalCount += 1
    structuredData.blogs[year].totalCount += 1
  })

  return structuredData
}

const renderBlogs = blogs => {
  return (
    <ul className="menu bg-base-200 rounded-box">
      {Object.entries(blogs)
        .reverse()
        .map(([year, yearData]) => (
          <li key={year}>
            <details>
              <summary>
                {year} ({yearData.totalCount})
              </summary>
              <ul>
                {Object.entries(yearData)
                  .reverse()
                  .map(([month, monthData]) => {
                    if (month === "totalCount") {
                      return null
                    }
                    return (
                      <li key={month}>
                        <details>
                          <summary>
                            {month} ({monthData.totalCount})
                          </summary>
                          <ul>
                            {monthData.blog.map((blog, index) => (
                              <li key={index}>
                                <Link to={`/blog/${blog.id}`}>
                                  {blog.title.slice(0, 20)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </li>
                    )
                  })}
              </ul>
            </details>
          </li>
        ))}
    </ul>
  )
}

const BlogListings = () => {
  const domainId = useDomain()
  const {data, loading} = useQuery(BLOGS_QUERY, {
    variables: {
      limit: 0,
      offset: 0,
      published: true,
      author: domainId
    }
  })

  if (loading || !domainId) return <Loading />

  return <>{renderBlogs(listBlogs(data).blogs)}</>
}
export default BlogListings
