
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import BoardLayout from './layouts/BoardLayout'
import PostsPage from './pages/posts/PostsPage'
import PostCreatePage from './pages/posts/PostCreatePage'
import PostDetailPage from './pages/posts/PostDetailPage'
import PostEditPage from './pages/posts/PostEditPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoardLayout />}>
            <Route
              index
              element={<Navigate to="/posts" replace />}
            />

            <Route
              path="posts"
              element={<PostsPage />}
            />

            <Route
              path="posts/new"
              element={<PostCreatePage />}
            />

            <Route
              path="posts/:id"
              element={<PostDetailPage />}
            />

            <Route
              path="posts/:id/edit"
              element={<PostEditPage />}
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/posts" replace />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
