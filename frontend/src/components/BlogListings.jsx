import {useQuery, gql} from "@apollo/client"
import Loading from "./Loading"

const BLOGS_QUERY = gql`
  query BlogsByUsername($username: String!) {
    blogsByUsername(username: $username) {
      createdAt
      title
      id
    }
  }
`
const listBlogs = data => {
  const blogs = data

  const structuredData = {blogs: {}, totalCount: blogs.length}

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
                                <a>{blog.title.slice(0, 20)}</a>
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
  const {data} = useQuery(BLOGS_QUERY, {
    variables: {
      username: "enginyuksel"
    }
  })

  if (!data) {
    return <Loading />
  }

  return <>{renderBlogs(listBlogs(data.blogsByUsername).blogs)}</>
}
export default BlogListings
