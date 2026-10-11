import { useNavigate, useParams } from 'react-router';
import { usePost, useUpdatePost } from '../hooks/usePosts';
import PostForm from '../components/PostForm';
import type { PostFormValues } from '../components/PostForm';

export default function PostEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isPending, isError, error } = usePost(id);
  const { mutateAsync } = useUpdatePost(id);

  const handleSubmit = async (values: PostFormValues) => {
    await mutateAsync(values);
    navigate(`/posts/${id}`);
  };

  if (isPending) return <p className="text-sm">불러오는 중...</p>;
  if (isError) {
    return (
      <p className="text-sm text-red-600">
        {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
      </p>
    );
  }
  if (!post) return null;

  return (
    <>
      <h2 className="text-xl font-semibold">글 수정</h2>
      <PostForm
        initialValues={{ title: post.title, content: post.content }}
        submitLabel="수정"
        onSubmit={handleSubmit}
      />
    </>
  );
}