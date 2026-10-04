import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deletePost, getPost } from "../api/posts";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id!);
        setPost(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // DELETE 기능 수현 - 삭제 함수 추가
  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

    if (!isConfirmed) return;

    try {
      await deletePost(id!);
      navigate("/posts");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
      );
    }
  };
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>게시글이 없습니다.</p>;
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

          <p className="mb-6 text-sm text-gray-500">작성자: {post.author}</p>

          <div className="min-h-40 whitespace-pre-wrap border-t border-gray-200 pt-6 text-gray-800">
            {post.content}
          </div>

          <div className="mt-8 flex gap-2">
            <Link
              to="/posts"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2"
            >
              목록으로
            </Link>

            <Link
              to={`/posts/${id}/edit`}
              className="rounded-lg bg-gray-800 px-4 py-2 text-white"
            >
              수정
            </Link>

            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-500 px-4 py-2 text-white"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
