import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../api/posts';
import PostForm from '../components/PostForm';
import type { CreatePostInput, Post } from '../types/post';

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 기존 글 내용을 불러와서 폼에 채우기
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setPost(await getPost(id));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <p className="py-8 text-center text-sm text-dusty-rose-dark">불러오는 중...</p>;

  if (!post) {
    return (
      <div className="py-8 text-center text-sm text-dusty-rose-dark">
        <p className="mb-3">존재하지 않는 게시글입니다.</p>
        <Link to="/posts" className="font-semibold text-dusty-rose-dark underline">
          목록으로
        </Link>
      </div>
    );
  }

  const handleSubmit = async (input: CreatePostInput) => {
    try {
      await updatePost(post.id, input); // PATCH /posts/:id
      navigate(`/posts/${post.id}`);
    } catch {
      alert('수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-dusty-rose-dark">글 수정</h2>
      <PostForm
        initialValues={{ title: post.title, content: post.content, author: post.author }}
        submitLabel="수정"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
