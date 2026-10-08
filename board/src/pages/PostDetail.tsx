import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePost, getPost } from '../api/posts';
import type { Post } from '../types/post';

export default function PostDetail() {
  const { id } = useParams(); // /posts/3 → id === "3" (문자열)
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const data = await getPost(id); // 없는 글이면 null
        setPost(data);
      } catch {
        setError('게시글을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]); // id가 바뀌면 다시 요청

  const handleDelete = async () => {
    if (!post || !confirm('정말 삭제할까요?')) return;
    try {
      await deletePost(post.id);
      navigate('/posts'); // 삭제 후 목록으로
    } catch {
      alert('삭제하지 못했습니다.');
    }
  };

  if (isLoading) return <p className="py-8 text-center text-sm text-dusty-rose-dark">게시글을 불러오는 중...</p>;
  if (error) return <p className="py-8 text-center text-sm text-red-500">{error}</p>;

  // 서버가 404를 준 경우
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

  const btn = 'rounded-md border border-rose-200 px-3 py-1.5 text-sm text-dusty-rose-dark hover:bg-rose-50';

    return (
    <div>
      {/* 게시글 전체를 감싸는 블록 */}
      <article className="rounded-xl border border-rose-100 bg-white p-6">
        <h2 className="break-all text-xl font-bold text-dusty-rose-dark">{post.title}</h2>
        <p className="ml-0.3 mt-2 text-[11px] text-dusty-rose"> {post.author}</p>

        {/* 제목 영역과 본문 사이 구분선 */}
        <hr className="my-4 border-rose-100" />

        <p className="min-h-40 whitespace-pre-wrap break-all text-sm font-medium leading-relaxed text-dusty-rose-dark">{post.content}</p>
      </article>

      {/* 버튼은 블록 바깥 아래에 */}
      <div className="mt-4 flex gap-2">
        <Link to="/posts" className={btn}>
          ← 목록
        </Link>
        <Link to={`/posts/${post.id}/edit`} className={`${btn} ml-auto`}>
          수정
        </Link>
        <button onClick={handleDelete} className={`${btn} hover:text-red-500`}>
          삭제
        </button>
      </div>
    </div>
  );
}