import {useState, useEffect, useCallback} from "react"
import DataTable from "react-data-table-component"
import {useLazyQuery, gql} from "@apollo/client"
import {useNavigate} from "react-router-dom"
import {Button} from "@/components/ui/button"
import {Switch} from "@/components/ui/switch"
import PublishForm from "@/components/forms/PublishForm"
import Loading from "./main/Loading"
import TagsForm from "@/components/forms/TagsForm"
import DeleteForm from "./forms/DeleteForm"
import {useModal} from "@/contexts/ModalContext"

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
  const {openModal} = useModal()
  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [id, setId] = useState("")
  const [checkedStates, setCheckedStates] = useState({})
  const navigate = useNavigate()
  const userPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

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
        <div className="flex justify-center">
          <Switch
            checked={checkedStates[row.id]}
            onCheckedChange={() => {
              setId(row.id)
              openModal(
                "Publish Post",
                <PublishForm
                  blogId={row.id}
                  checkedStates={checkedStates}
                  setCheckedStates={setCheckedStates}
                />
              )
            }}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      )
    },
    {
      name: "Actions",
      cell: row => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/posts/${row.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setId(row.id)
              openModal("Manage Tags", <TagsForm blogId={row.id} />)
            }}
          >
            Tags
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              openModal(
                "Delete Post",
                <DeleteForm blogId={row.id} onSuccess={deleteAction} />
              )
            }}
          >
            Delete
          </Button>
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
    fetchPolicy: "network-only"
  })

  const fetchBlogs = useCallback(async () => {
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
    <DataTable
      theme={userPrefersDark ? "dark" : "default"}
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
  )
}

export default DataTableWithPagination
