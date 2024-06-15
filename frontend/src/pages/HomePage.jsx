import {Route, Routes} from "react-router-dom"
import BlogListings from "../components/BlogListings"
import BlogScroll from "../components/BlogScroll"
import Tags from "../components/Tags"
import BlogView from "../components/BlogView"
import Navbar from "../components/Navbar"
import SearchView from "../components/SearchView"
import NotFound from "../components/NotFound"
import Search from "../components/Search"
import Theme from "../components/Theme"
import Bio from "../components/Bio"

const HomePage = () => {
  return (
    <>
      <div className="drawer">
        <input id="left-drawer" type="checkbox" className="drawer-toggle" />
        <div className="bg-base-200 text-base-content drawer-content flex flex-col">
          {/* Navbar */}
          <Navbar />

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="shadow-md bg-base-300 text-base-content hidden md:block md:col-span-3 p-4 h-screen sticky top-0 overflow-auto">
                <BlogListings />
              </div>

              <div className="bg-base-200 md:col-span-7 p-1">
                <Routes>
                  <Route path="/" element={<BlogScroll />} />
                  <Route path="tag/:id" element={<BlogScroll />} />
                  <Route path="blog/:id" element={<BlogView />} />
                  <Route path="search/" element={<SearchView />} />
                  <Route path="about/" element={<Bio />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>

              <div className="shadow-md bg-base-300 text-base-content hidden md:block md:col-span-2 p-4 h-screen sticky top-0 overflow-auto">
                <Tags />
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="left-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li className="mt-20">
              <Theme />
            </li>
            <li className="mt-5">
              <Search />
            </li>
            <li className="mt-5">
              <BlogListings />
            </li>
            <li className="mt-5">
              <Tags />
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default HomePage
