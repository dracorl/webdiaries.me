import {useState, useEffect, useCallback} from "react"
import DataTable from "react-data-table-component"
import {useLazyQuery, gql} from "@apollo/client"
import {useNavigate} from "react-router-dom"
import EditContentModal from "./modals/EditContentModal"
import DeleteModal from "./modals/DeleteModal"
import TagsModal from "./modals/TagsModal"
import PublishedModal from "./modals/PublishedModal"
import Loading from "./main/Loading"

const BLOGS_QUERY = gql`
  query Blogs($limit: Int!, $offset: Int!) {
    blogs(limit: $limit, offset: $offset) {
      blog {
        id
        title
        published
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
  const [checkedStates, setCheckedStates] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    setCheckedStates(
      data.reduce(
        (states, blog) => ({...states, [blog.id]: blog.published}),
        {}
      )
    )
  }, [data])

  const columns = [
    {
      name: "Title",
      selector: row => row.title,
      sortable: true
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
      name: "Published",
      cell: row => (
        <input
          type="checkbox"
          className="toggle"
          checked={checkedStates[row.id] || false}
          onChange={() => {}} //dummy function react things
          onClick={e => {
            e.preventDefault()
            setId(row.id)
            document.getElementById("publishedModal").showModal()
          }}
        />
      )
    },
    {
      name: "Actions",
      cell: row => (
        <div className="join join-vertical lg:join-horizontal">
          <button
            onClick={() => navigate(`/posts/${row.id}/edit`)}
            className="btn-xs btn join-item btn-primary"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setId(row.id)
              document.getElementById("tagsModal").showModal()
            }}
            className="btn-xs btn join-item btn-warning"
          >
            Tags
          </button>
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
      let defaultCheckStates = {}
      data.blogs.blog.forEach(blog => {
        defaultCheckStates[blog.id] = blog.published
      })
      setData(data.blogs.blog)
      setCheckedStates(defaultCheckStates)
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
    fetchBlogs()
  }, [fetchBlogs])

  return (
    <>
      <DataTable
        title="Blog Posts"
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<Loading />}
        pagination
        paginationServer
        paginationDefaultPage={currentPage}
        paginationPerPage={pageSize}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
      <EditContentModal blogId={id} />
      <DeleteModal blogId={id} deleteAction={deleteAction} />
      <TagsModal blogId={id} />
      <PublishedModal
        blogId={id}
        checkedStates={checkedStates}
        setCheckedStates={setCheckedStates}
      />
    </>
  )
}

export default DataTableWithPagination
