import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getPost, updatePost } from '../api/posts';
import type { Post } from '../types/posts';
import PostForm from '../components/PostForm';
import type { PostFormValues } from '../components/PostForm';

export default function PostEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

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

  const handleSubmit = async (values: PostFormValues) => {
    if (!id) return;
    await updatePost(id, values);
    navigate(`/posts/${id}`);
  };

  if (isLoading) return <p className="text-sm">불러오는 중...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
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