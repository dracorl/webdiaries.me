import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import GuestLayout from "./layouts/GuestLayout"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import PostsPage from "./pages/PostsPage"
import CreateBlogPostPage from "./pages/CreateBlogPostPage"
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <GuestLayout>
              <HomePage />
            </GuestLayout>
          }
        />
        <Route path="/create" element={<CreateBlogPostPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
export default App
