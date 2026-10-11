import { useSearchParams } from 'react-router';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 5;

export default function PostListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';

  const { data: posts = [], isPending, isError, error } = usePosts({
    page,
    limit: PAGE_SIZE,
    search,
  });

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

      {isPending && <p className="text-sm">불러오는 중...</p>}
      {isError && (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
        </p>
      )}

      {!isPending && !isError && posts.length === 0 && (
        <p className="text-sm">게시글이 없습니다.</p>
      )}

      {!isPending && !isError && posts.length > 0 && (
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