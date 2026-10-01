import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError, deletePost, fetchPost } from '../../api/posts'
import type { Post } from '../../types/post'

/** 게시글 상세 페이지 (/posts/:id) — Dynamic Route */
function PostDetailPage() {
  // Dynamic Route: URL 경로의 :id 부분을 Path Parameter로 읽는다
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let ignore = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchPost(id as string)
        if (!ignore) setPost(data)
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
  }, [id])

  async function handleDelete() {
    if (!id) return
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    try {
      await deletePost(id)
      navigate('/posts') // 삭제 성공 시 목록 페이지로 이동
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : '삭제에 실패했습니다.')
    }
  }

  if (loading) return <p className="status">불러오는 중...</p>
  if (error) return <p className="status error">{error}</p>
  if (!post) return null

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span className="avatar" aria-hidden="true">
          {post.author.charAt(0)}
        </span>
        <span className="author">{post.author}</span>
        <span className="dot">·</span>
        <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</time>
      </div>
      <p className="content">{post.content}</p>

      <div className="actions">
        <Link to="/posts" className="btn btn-ghost">
          목록으로
        </Link>
        <Link to={`/posts/${post.id}/edit`} className="btn btn-secondary">
          수정
        </Link>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  )
}

export default PostDetailPage
