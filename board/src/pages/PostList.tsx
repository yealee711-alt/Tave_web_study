import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Post } from "../types/post";
import { getPosts } from "../api/posts";

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("q") || "";
  const handleReset = () => {
    setSearchParams({});
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPosts();

        const filteredPosts = keyword
          ? data.filter((post) =>
              post.title.toLowerCase().includes(keyword.toLowerCase()),
            )
          : data;

        setPosts(filteredPosts);
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

    fetchPosts();
  }, [keyword]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search")?.toString().trim();

    if (searchValue) {
      setSearchParams({ q: searchValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">게시판</h1>

          <Link
            to="/posts/new"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
          >
            새 글 작성
          </Link>
        </div>

        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            name="search"
            type="text"
            placeholder="제목을 검색하세요"
            defaultValue={keyword}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-black"
          />

          <button
            type="submit"
            className="rounded-lg bg-gray-800 px-4 py-2 text-white"
          >
            검색
          </button>

          {keyword && (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2"
            >
              전체 보기
            </button>
          )}
        </form>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="grid grid-cols-[80px_1fr_140px] border-b bg-gray-100 px-4 py-3 text-sm font-semibold">
            <span>번호</span>
            <span>제목</span>
            <span>작성자</span>
          </div>

          {loading && (
            <p className="py-10 text-center text-gray-500">로딩 중...</p>
          )}

          {error && <p className="py-10 text-center text-red-500">{error}</p>}

          {!loading && !error && posts.length === 0 && (
            <p className="py-10 text-center text-gray-500">
              게시글이 없습니다.
            </p>
          )}

          {!loading &&
            !error &&
            posts.map((post, index) => (
              <div
                key={post.id}
                className="grid grid-cols-[80px_1fr_140px] items-center border-b px-4 py-4 last:border-b-0"
              >
                <span className="text-sm text-gray-500">{index + 1}</span>

                <Link
                  to={`/posts/${post.id}`}
                  className="font-medium hover:underline"
                >
                  {post.title}
                </Link>

                <span className="text-sm text-gray-600">{post.author}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PostList;
