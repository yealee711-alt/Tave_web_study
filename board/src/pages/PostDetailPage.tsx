import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { getPost, deletePost } from '../api/posts';
import type { Post } from '../types/posts';
import Button from '../components/common/Button';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    setIsLoading(true);
    setError('');

    getPost(id, controller.signal)
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('이 게시글을 삭제할까요?')) return;

    try {
      await deletePost(id);
      navigate('/posts');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '삭제에 실패했습니다.');
    }
  };

  if (isLoading) return <p className="text-sm">불러오는 중...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
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
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
    </article>
  );
}