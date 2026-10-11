import { Link, useNavigate, useParams } from 'react-router-dom'
import { getErrorMessage } from '../../api/client'
import ErrorState from '../../components/feedback/ErrorState'
import { PostDetailSkeleton } from '../../components/feedback/LoadingState'
import PostMeta from '../../components/posts/PostMeta'
import { useAuth } from '../../hooks/useAuth'
import { usePost } from '../../hooks/usePost'
import { useDeletePost } from '../../hooks/usePostMutations'

/** 게시글 상세 페이지 (/posts/:id) — Dynamic Route */
function PostDetailPage() {
  // Dynamic Route: URL 경로의 :id 부분을 Path Parameter로 읽는다
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isLoggedIn, isAuthor } = useAuth()

  const { data: post, isPending, isError, error, refetch } = usePost(id)
  const deleteMutation = useDeletePost()

  function handleDelete() {
    if (!id) return
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    deleteMutation.mutate(id, {
      onSuccess: () => navigate('/posts', { replace: true }), // 삭제 성공 시 목록으로 이동
    })
  }

  if (isPending) return <PostDetailSkeleton />
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <PostMeta post={post} />
      <p className="content">{post.content}</p>

      {deleteMutation.isError && (
        <p className="status error">{getErrorMessage(deleteMutation.error, '삭제에 실패했습니다.')}</p>
      )}

      <div className="actions">
        <Link to="/posts" className="btn btn-ghost">
          목록으로
        </Link>
        {/* 수정/삭제 버튼은 작성자 본인에게만 보여준다 */}
        {isAuthor(post) && (
          <>
            <Link to={`/posts/${post.id}/edit`} className="btn btn-secondary">
              수정
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? '삭제 중...' : '삭제'}
            </button>
          </>
        )}
      </div>
      {!isLoggedIn && <p className="hint">로그인하면 내가 쓴 글을 수정·삭제할 수 있어요.</p>}
    </div>
  )
}

export default PostDetailPage
