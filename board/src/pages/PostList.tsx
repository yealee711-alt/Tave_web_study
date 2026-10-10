import type { FormEvent, ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import PostCard from '../components/PostCard';

export default function PostList() {
  // 검색어는 state가 아니라 URL(?search=)에 저장 → 새로고침·뒤로가기·공유해도 유지
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';

  // 서버 데이터는 Custom Hook(useQuery)이 담당 → 로딩·에러·캐싱을 알아서 관리
  const { data, isPending, isError, error, refetch } = usePosts(search);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = (new FormData(e.currentTarget).get('keyword') as string).trim();
    setSearchParams(keyword ? { search: keyword } : {});
  };

  // Loading → Error → Empty → Success 순서로 하나씩 걸러내기
  let content: ReactNode;
  if (isPending) {
    content = <Loading message="게시글을 불러오는 중입니다..." />;
  } else if (isError) {
    content = <ErrorMessage message={`게시글을 불러오지 못했습니다. (${error.message})`} onRetry={() => refetch()} />;
  } else if (data.length === 0) {
    content = search ? (
      <EmptyState
        message={`'${search}' 검색 결과가 없습니다.`}
        action={
          <button onClick={() => setSearchParams({})} className="font-semibold text-dusty-rose-dark underline">
            전체 목록 보기
          </button>
        }
      />
    ) : (
      <EmptyState
        message="아직 게시글이 없어요. 첫 번째 게시글을 작성해보세요!"
        action={
          <Link to="/posts/new" className="font-semibold text-dusty-rose-dark underline">
            글쓰기
          </Link>
        }
      />
    );
  } else {
    content = (
      <ul className="divide-y divide-rose-100 border-y border-rose-100">
        {data.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    );
  }

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

      {content}
    </div>
  );
}
