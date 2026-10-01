import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ApiError, fetchPosts } from '../../api/posts'
import type { Post } from '../../types/post'

/** 게시글 목록 + 검색 페이지 (/posts, /posts?search=keyword) */
function PostsPage() {
  // useSearchParams: URL의 쿼리스트링을 React 상태처럼 읽고 쓴다.
  // 검색어를 여기 담아두면 새로고침해도 URL에 남아있어서 검색 상태가 유지된다.
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const [keyword, setKeyword] = useState(search) // 입력창의 임시 값
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect + async/await: search(쿼리 파라미터)가 바뀔 때마다 실제 GET API를 호출한다
  useEffect(() => {
    let ignore = false // 언마운트/재요청 사이에 이전 요청 결과가 덮어쓰지 않도록 막는 플래그

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchPosts(search || undefined)
        if (!ignore) setPosts(data)
      } catch (err) {
        if (!ignore) {
          setError(err instanceof ApiError ? err.message : '게시글을 불러오지 못했습니다.')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [search])

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    // 검색 버튼을 누르면 URL의 Query Parameter(search)를 바꾼다 → /posts?search=keyword
    setSearchParams(keyword ? { search: keyword } : {})
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

      {loading && <p className="status">불러오는 중...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <ul className="post-list">
          {posts.length === 0 && <li className="empty">게시글이 없습니다.</li>}
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`} className="post-card">
                <strong>{post.title}</strong>
                <p>{post.content}</p>
                <div className="post-meta">
                  <span className="avatar" aria-hidden="true">
                    {post.author.charAt(0)}
                  </span>
                  <span className="author">{post.author}</span>
                  <span className="dot">·</span>
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PostsPage
