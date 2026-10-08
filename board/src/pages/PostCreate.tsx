import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';
import PostForm from '../components/PostForm';
import type { CreatePostInput } from '../types/post';

export default function PostCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (input: CreatePostInput) => {
    try {
      const newPost = await createPost(input); // POST /posts
      navigate(`/posts/${newPost.id}`); // 서버가 만든 id로 상세 페이지 이동
    } catch {
      alert('작성에 실패했습니다.');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-dusty-rose-dark">글쓰기</h2>
      <PostForm submitLabel="작성" onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
    </div>
  );
}
