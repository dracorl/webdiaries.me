import {FaSearch} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import {useState} from "react"

const Search = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/search/?search=${search}`)
    document.querySelector("#left-drawer").checked = false
  }

  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSearch()
          }
        }}
        type="text"
        className="grow"
        placeholder="Search"
      />
      <FaSearch onClick={handleSearch} />
    </label>
  )
}
export default Search
