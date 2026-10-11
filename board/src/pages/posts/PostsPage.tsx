import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import EmptyState from '../../components/feedback/EmptyState'
import ErrorState from '../../components/feedback/ErrorState'
import { PostListSkeleton } from '../../components/feedback/LoadingState'
import PostCard from '../../components/posts/PostCard'
import { usePosts } from '../../hooks/usePosts'

/** 게시글 목록 + 검색 페이지 (/posts, /posts?search=keyword) */
function PostsPage() {
  // useSearchParams: URL의 쿼리스트링을 React 상태처럼 읽고 쓴다.
  // 검색어를 여기 담아두면 새로고침해도 URL에 남아있어서 검색 상태가 유지된다.
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const [keyword, setKeyword] = useState(search) // 입력창의 임시 값

  // search가 바뀌면 queryKey가 바뀌어서 React Query가 알아서 다시 요청한다 (useEffect 불필요)
  const { data: posts, isPending, isError, error, refetch, isFetching } = usePosts(search)

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    // 검색 버튼을 누르면 URL의 Query Parameter(search)를 바꾼다 → /posts?search=keyword
    setSearchParams(keyword.trim() ? { search: keyword.trim() } : {})
  }

  function renderContent() {
    if (isPending) return <PostListSkeleton />
    if (isError) return <ErrorState error={error} onRetry={() => refetch()} />

    if (posts.length === 0) {
      return search ? (
        <EmptyState
          title={`'${search}' 검색 결과가 없어요`}
          description="다른 키워드로 검색해보세요."
          action={
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setKeyword('')
                setSearchParams({})
              }}
            >
              전체 글 보기
            </button>
          }
        />
      ) : (
        <EmptyState
          title="아직 게시글이 없어요"
          description="첫 번째 글을 작성해보세요!"
          action={
            <Link to="/posts/new" className="btn btn-primary">
              + 글쓰기
            </Link>
          }
        />
      )
    }

    return (
      <ul className={`post-list${isFetching ? ' refreshing' : ''}`}>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="posts-page">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="제목 또는 내용 검색"
        />
        <button type="submit" className="btn btn-secondary">
          검색
        </button>
        <Link to="/posts/new" className="btn btn-primary">
          + 글쓰기
        </Link>
      </form>

      {renderContent()}
    </div>
  )
}

export default PostsPage
