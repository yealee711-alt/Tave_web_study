import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { useUpdatePost } from '../hooks/useUpdatePost';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import PostForm from '../components/PostForm';
import type { PostInput } from '../types/post';

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isPending, isError, error, refetch } = usePost(id); // 기존 글 불러오기
  const updateMutation = useUpdatePost();

  if (isPending) return <Loading />;
  if (isError) {
    return <ErrorMessage message={`게시글을 불러오지 못했습니다. (${error.message})`} onRetry={() => refetch()} />;
  }
  if (!post) {
    return (
      <EmptyState
        message="존재하지 않는 게시글입니다."
        action={
          <Link to="/posts" className="font-semibold text-dusty-rose-dark underline">
            목록으로
          </Link>
        }
      />
    );
  }

  const handleSubmit = (input: PostInput) => {
    updateMutation.mutate(
      { id: post.id, input },
      { onSuccess: () => navigate(`/posts/${post.id}`) }
    );
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-dusty-rose-dark">글 수정</h2>
      <PostForm
        initialValues={{ title: post.title, content: post.content, author: post.author }}
        submitLabel="수정"
        isSubmitting={updateMutation.isPending}
        errorMessage={updateMutation.isError ? `수정에 실패했습니다. (${updateMutation.error.message})` : undefined}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
