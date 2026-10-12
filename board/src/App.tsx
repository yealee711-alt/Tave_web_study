import { Navigate, Route, Routes } from "react-router-dom";
import BoardLayout from "./layouts/BoardLayout";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />

      <Route path="/posts" element={<BoardLayout />}>
        <Route index element={<PostList />} />
        <Route path="new" element={<PostCreate />} />
        <Route path=":id" element={<PostDetail />} />
        <Route path=":id/edit" element={<PostEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
