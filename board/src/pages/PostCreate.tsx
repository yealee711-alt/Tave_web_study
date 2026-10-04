import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createPost } from "../api/posts";

function PostCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !content.trim() || !author.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createPost({
        title,
        content,
        author,
      });

      navigate("/posts");
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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <h1 className="mb-6 text-2xl font-bold">게시글 작성</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                제목
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium"
              >
                작성자
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium"
              >
                내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={8}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
              <Link
                to="/posts"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2"
              >
                취소
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
              >
                {loading ? "작성 중..." : "작성하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostCreate;
