import Search from "./Search"

const Navbar = () => {
  return (
    <div className="navbar bg-gray-200 shadow-sm">
      <div className="flex justify-center w-full gap-2">
        <Search />
      </div>
    </div>
  )
}
export default Navbar
