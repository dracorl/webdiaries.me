import {useState, useEffect} from "react"
import axios from "axios"
import DataTable from "react-data-table-component"
import {useLazyQuery, gql} from "@apollo/client"

const BLOGS_QUERY = gql`
  query Blogs($limit: Int!, $offset: Int!) {
    blogs(limit: $limit, offset: $offset) {
      id
      title
      updatedAt
      createdAt
    }
  }
`

const columns = [
  {
    name: "Title",
    selector: row => row.title,
    sortable: true
  },
  {
    name: "ID",
    selector: row => row.id
  },
  {
    name: "Updated At",
    selector: row => row.updatedAt,
    sortable: true
  },
  {
    name: "Created At",
    selector: row => row.createdAt,
    sortable: true
  }
]

const DataTableWithPagination = () => {
  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [blogs, {loading, error}] = useLazyQuery(BLOGS_QUERY, {
    onCompleted: data => {
      console.log(data)
      setData(data.blogs)
      setTotalRows(data.blogs.length)
    },
    fetchPolicy: "network-only" // This ensures the query is always sent to the server
  })
  const fetchUsers = async page => {
    const offset = (page - 1) * pageSize
    blogs({variables: {limit: pageSize, offset: offset}})
  }

  const handlePageChange = page => {
    setCurrentPage(page)
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPageSize, page) => {
    const offset = (page - 1) * newPageSize
    blogs({variables: {limit: newPageSize, offset: offset}})
    setPageSize(newPageSize)
  }

  useEffect(() => {
    fetchUsers(1) // fetch page 1 of users
  }, [])

  return (
    <DataTable
      title="Users"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationPerPage={pageSize}
      paginationTotalRows={totalRows}
      paginationDefaultPage={currentPage}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  )
}

export default DataTableWithPagination
