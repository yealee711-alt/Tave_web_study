import { useEffect, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPosts } from '../api/posts';
import type { Post } from '../types/post';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 검색어는 state가 아니라 URL(?search=)에 저장 → 새로고침·뒤로가기·공유해도 유지
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(search);
        setPosts(data);
        setError(null);
      } catch (err) {
        // 원인을 같이 보여줘서 디버깅하기 쉽게
        const reason = err instanceof Error ? err.message : String(err);
        setError(`게시글을 불러오지 못했습니다. (${reason})`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [search]); // 검색어가 바뀔 때마다 다시 요청

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = (new FormData(e.currentTarget).get('keyword') as string).trim();
    setSearchParams(keyword ? { search: keyword } : {});
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        {/* key={search}: 뒤로가기로 검색어가 바뀌면 입력창도 그 값으로 다시 그림 */}
        <input
          key={search}
          name="keyword"
          defaultValue={search}
          placeholder="제목으로 검색"
          className="flex-1 rounded-md border border-rose-200 px-4 py-2 text-[13px] outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
        />
        <button type="submit" className="rounded-md bg-rose-200 px-4 py-2 text-sm font-semibold text-dusty-rose-dark hover:bg-rose-300">
          검색
        </button>
      </form>

      {isLoading && <p className="py-8 text-center text-sm text-dusty-rose-dark">불러오는 중...</p>}
      {error && <p className="py-8 text-center text-sm text-red-500">{error}</p>}

      {!isLoading && !error && posts.length === 0 && (
        <div className="py-8 text-center text-sm text-dusty-rose-dark">
          <p className="mb-2">{search ? `'${search}' 검색 결과가 없습니다.` : '게시글이 없습니다.'}</p>
          {search && (
            <button onClick={() => setSearchParams({})} className="font-semibold text-dusty-rose-dark underline">
              전체 목록 보기
            </button>
          )}
        </div>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <ul className="divide-y divide-rose-100 border-y border-rose-100">
          {posts.map((post) => (
            <li key={post.id}>
              {/* 제목과 작성자를 위아래로 쌓아서 블록을 세로로 길게 */}
              <Link to={`/posts/${post.id}`} className="flex flex-col gap-1.5 px-3 py-5 hover:bg-rose-50">
                <span className="truncate text-base font-medium text-dusty-rose-dark">{post.title}</span>
                <span className="text-[11px] text-dusty-rose-dark">{post.author}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
