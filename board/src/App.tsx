import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BoardLayout from './layouts/BoardLayout'
import PostCreatePage from './pages/posts/PostCreatePage'
import PostDetailPage from './pages/posts/PostDetailPage'
import PostEditPage from './pages/posts/PostEditPage'
import PostsPage from './pages/posts/PostsPage'

/**
 * 라우트 구조 (Nested Routing + Dynamic Route):
 *
 * <BrowserRouter>
 *   <Routes>
 *     /            → /posts 로 리다이렉트
 *     /posts        (BoardLayout, Outlet)
 *       ├─ index       → PostsPage        (목록 + 검색)
 *       ├─ new          → PostCreatePage   (작성)
 *       ├─ :id          → PostDetailPage   (상세, Dynamic Route)
 *       └─ :id/edit     → PostEditPage     (수정)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />

        <Route path="/posts" element={<BoardLayout />}>
          <Route index element={<PostsPage />} />
          <Route path="new" element={<PostCreatePage />} />
          <Route path=":id" element={<PostDetailPage />} />
          <Route path=":id/edit" element={<PostEditPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
