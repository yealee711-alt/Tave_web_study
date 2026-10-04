/*
CRUD - 수정 기능 수현
 */
import { useEffect, useState } from "react";
import { getPost, updatePost } from "../api/posts";
import { Link, useNavigate, useParams } from "react-router-dom";

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id!);

        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
        );
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updatePost(id!, {
        title,
        content,
        author,
      });

      navigate(`/posts/${id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <h1 className="mb-6 text-2xl font-bold">게시글 수정</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">제목</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">작성자</label>
              <input
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">내용</label>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={8}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
              <Link
                to={`/posts/${id}`}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2"
              >
                취소
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                수정하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostEdit;
