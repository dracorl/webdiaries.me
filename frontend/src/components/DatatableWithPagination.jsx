import {useState, useEffect, useCallback} from "react"
import DataTable from "react-data-table-component"
import {useLazyQuery, gql} from "@apollo/client"
import DeleteModal from "../components/DeleteModal"

const BLOGS_QUERY = gql`
  query Blogs($limit: Int!, $offset: Int!) {
    blogs(limit: $limit, offset: $offset) {
      blog {
        id
        title
        updatedAt
        createdAt
      }
      totalCount
    }
  }
`

const formatDate = timestamp =>
  new Date(Number(timestamp)).toLocaleString(navigator.language, {
    month: "long",
    day: "numeric",
    year: "numeric",
    localeMatcher: "best fit"
  })

const DataTableWithPagination = () => {
  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [id, setId] = useState("")

  const columns = [
    {
      name: "Title",
      selector: row => row.title,
      sortable: true,
      maxWidth: "20vw"
    },
    {
      name: "Updated At",
      selector: row => formatDate(row.updatedAt),
      sortable: true
    },
    {
      name: "Created At",
      selector: row => formatDate(row.createdAt),
      sortable: true
    },
    {
      cell: row => (
        <div className="join join-vertical lg:join-horizontal">
          <button className="btn-xs btn join-item btn-primary">Edit</button>
          <button className="btn-xs btn join-item btn-warning">Tags</button>
          <button
            onClick={() => {
              setId(row.id)
              document.getElementById("deleteModal").showModal()
            }}
            className="btn-xs btn join-item btn-error"
          >
            Delete
          </button>
        </div>
      )
    }
  ]

  const [blogs, {loading}] = useLazyQuery(BLOGS_QUERY, {
    onCompleted: data => {
      setData(data.blogs.blog)
      setTotalRows(data.blogs.totalCount)
    },
    fetchPolicy: "network-only" // This ensures the query is always sent to the server
  })

  const fetchBlogs = useCallback(async () => {
    console.log("Fetching blogs...")

    const offset = (currentPage - 1) * pageSize
    blogs({variables: {limit: pageSize, offset: offset}})
  }, [blogs, currentPage, pageSize])

  const deleteAction = async () => {
    fetchBlogs()
  }
  const handlePageChange = page => {
    setCurrentPage(page)
    fetchBlogs()
  }

  const handlePerRowsChange = async (newPageSize, page) => {
    const offset = (page - 1) * newPageSize
    blogs({variables: {limit: newPageSize, offset: offset}})
    setPageSize(newPageSize)
  }

  useEffect(() => {
    fetchBlogs() // fetch page 1 of users
  }, [fetchBlogs])

  return (
    <>
      <DataTable
        title="Blog Posts"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationDefaultPage={currentPage}
        paginationPerPage={pageSize}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
      <DeleteModal blogId={id} deleteAction={deleteAction} />
    </>
  )
}

export default DataTableWithPagination
