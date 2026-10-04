import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getPosts } from '../api/posts';
import type { Post } from '../types/posts';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 5;

export default function PostListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError('');

    getPosts({ page, limit: PAGE_SIZE, search }, controller.signal)
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [page, search]);

  const handleSearch = (keyword: string) => {
    setSearchParams(keyword ? { search: keyword, page: '1' } : { page: '1' });
  };

  const handlePageChange = (next: number) => {
    const params: Record<string, string> = { page: String(next) };
    if (search) params.search = search;
    setSearchParams(params);
  };

  return (
    <>
      <SearchBar initialValue={search} onSearch={handleSearch} />

      {isLoading && <p className="text-sm">불러오는 중...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!isLoading && !error && posts.length === 0 && (
        <p className="text-sm">게시글이 없습니다.</p>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <>
          <ul className="flex flex-col gap-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </ul>
          <Pagination
            page={page}
            hasNext={posts.length === PAGE_SIZE}
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}