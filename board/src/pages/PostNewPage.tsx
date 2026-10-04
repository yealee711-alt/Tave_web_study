import { useNavigate } from 'react-router';
import { createPost } from '../api/posts';
import PostForm from '../components/PostForm';
import type { PostFormValues } from '../components/PostForm';

export default function PostNewPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values: PostFormValues) => {
    const created = await createPost({
      ...values,
      createdAt: new Date().toISOString(),
    });
    navigate(`/posts/${created.id}`);
  };

  return (
    <>
      <h2 className="text-xl font-semibold">새 글 작성</h2>
      <PostForm submitLabel="등록" onSubmit={handleSubmit} />
    </>
  );
}