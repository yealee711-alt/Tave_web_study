import { Navigate, Route, Routes } from 'react-router-dom';
import BoardLayout from './components/BoardLayout';
import PostList from './pages/PostList';
import PostCreate from './pages/PostCreate';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />

      {/* 공통 레이아웃 안에 게시판 페이지들 */}
      <Route path="/posts" element={<BoardLayout />}>
        <Route index element={<PostList />} />
        <Route path="new" element={<PostCreate />} />
        <Route path=":id" element={<PostDetail />} />
        <Route path=":id/edit" element={<PostEdit />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
