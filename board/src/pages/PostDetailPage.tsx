import { Link, useNavigate, useParams } from 'react-router';
import { usePost, useDeletePost } from '../hooks/usePosts';
import Button from '../components/common/Button';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isPending, isError, error } = usePost(id);
  const deleteMutation = useDeletePost(id);

  const handleDelete = () => {
    if (!window.confirm('이 게시글을 삭제할까요?')) return;
    deleteMutation.mutate(undefined, {
      onSuccess: () => navigate('/posts'),
    });
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
    <article className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString('ko-KR')}
        </span>
      </div>

      <p className="whitespace-pre-wrap">{post.content}</p>

      {deleteMutation.isError && (
        <p className="text-sm text-red-600">
          {deleteMutation.error instanceof Error
            ? deleteMutation.error.message
            : '삭제에 실패했습니다.'}
        </p>
      )}

      <div className="flex items-center justify-between">
        <Link to="/posts" className="flex h-9 items-center text-gray-600">
          목록
        </Link>

        <div className="flex gap-2">
          <Link
            to={`/posts/${post.id}/edit`}
            className="flex h-9 items-center border border-gray-400 px-3"
          >
            수정
          </Link>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </Button>
        </div>
      </div>
    </article>
  );
}