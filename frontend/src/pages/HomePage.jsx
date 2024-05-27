import {Route, Routes} from "react-router-dom"
import BlogListings from "../components/BlogListings"
import BlogScroll from "../components/BlogScroll"
import Tags from "../components/Tags"
import BlogView from "../components/BlogView"
import Navbar from "../components/Navbar"
import SearchView from "../components/SearchView"
import NotFound from "../components/NotFound"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full p-0.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3 bg-gray-100 p-4 h-screen sticky top-0 overflow-auto">
            <BlogListings />
          </div>

          <div className="md:col-span-7 bg-white p-1">
            <Routes>
              <Route path="/" element={<BlogScroll />} />
              <Route path="tag/:id" element={<BlogScroll />} />
              <Route path="blog/:id" element={<BlogView />} />
              <Route path="search/" element={<SearchView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <div className="md:col-span-2 bg-gray-100 p-4 h-screen sticky top-0 overflow-auto">
            <Tags />
          </div>
        </div>
      </div>
    </>
  )
}
export default HomePage
