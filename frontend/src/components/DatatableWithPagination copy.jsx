import {useState, useEffect} from "react"
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

const DataTableWithPagination = () => {
  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [blogs, {loading}] = useLazyQuery(BLOGS_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      console.log(data)
      setData(data.blogs)
      // Sunucudan gelen toplam veri sayısını ayarla
      setTotalRows(data.blogs.length)
    }
  })

  useEffect(() => {
    console.log("currentPage", currentPage)
    const offset = (currentPage - 1) * pageSize
    blogs({variables: {limit: pageSize, offset: offset}})
  }, [currentPage, pageSize, blogs])

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const handlePerRowsChange = async (newPageSize, currentPage) => {
    console.log("newPageSize", newPageSize)
    setPageSize(newPageSize)
    setCurrentPage(currentPage)
  }

  const columns = [
    {
      name: "ID",
      selector: "id"
    },
    {
      name: "Title",
      selector: "title"
    },
    {
      name: "Updated At",
      selector: "updatedAt"
    },
    {
      name: "Created At",
      selector: "createdAt"
    }
  ]

  return (
    <div>
      <DataTable
        title="Veri Tablosu"
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={pageSize}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationDefaultPage={currentPage}
        paginationComponentOptions={{
          rowsPerPageText: "Sayfa başına satır:",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "Hepsi"
        }}
        onChangePage={handlePageChange}
        progressPending={loading}
      />
    </div>
  )
}

export default DataTableWithPagination
