import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import GuestLayout from "./layouts/GuestLayout"
import CreateBlogPostPage from "./pages/CreateBlogPostPage"
import PostsPage from "./pages/PostsPage"
import EditContentPage from "./pages/EditContentPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index element={<GuestLayout></GuestLayout>} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlogPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:blogId/edit"
          element={
            <ProtectedRoute>
              <EditContentPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
