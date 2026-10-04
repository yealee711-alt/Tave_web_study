import { Navigate, Route, Routes } from 'react-router-dom';
import TodoLayout from './components/TodoLayout';
import TodoList from './pages/TodoList';
import TodoCreate from './pages/TodoCreate';
import TodoDetail from './pages/TodoDetail';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* "/"로 들어오면 "/todos"로 보내기 */}
      <Route path="/" element={<Navigate to="/todos" replace />} />

      {/* 공통 틀(TodoLayout) 안에 페이지 3개 */}
      <Route path="/todos" element={<TodoLayout />}>
        <Route index element={<TodoList />} />
        <Route path="new" element={<TodoCreate />} />
        <Route path=":id" element={<TodoDetail />} />
      </Route>

      {/* 위에 없는 주소는 전부 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
