import { useNavigate, useParams } from 'react-router-dom'
import AccessDenied from '../../components/feedback/AccessDenied'
import ErrorState from '../../components/feedback/ErrorState'
import { PostDetailSkeleton } from '../../components/feedback/LoadingState'
import PostForm from '../../components/posts/PostForm'
import { useAuth } from '../../hooks/useAuth'
import { usePost } from '../../hooks/usePost'
import { useUpdatePost } from '../../hooks/usePostMutations'
import type { PostFormValues } from '../../types/post'

/** 게시글 수정 페이지 (/posts/:id/edit) — 작성자 본인만 */
function PostEditPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isLoggedIn, isAuthor } = useAuth()

  // 상세 페이지에서 넘어왔다면 이미 캐시에 있어서 요청 없이 바로 그려진다
  const { data: post, isPending, isError, error, refetch } = usePost(id)
  const updateMutation = useUpdatePost(id)

  function handleSubmit(values: PostFormValues) {
    updateMutation.mutate(values, {
      onSuccess: () => navigate(`/posts/${id}`, { replace: true }),
    })
  }

  // URL을 직접 입력해서 들어와도 막는다 (수정 화면에서 로그아웃해도 바로 반영됨)
  if (!isLoggedIn) return <AccessDenied reason="login" backTo={`/posts/${id}`} />
  if (isPending) return <PostDetailSkeleton />
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />
  if (!isAuthor(post)) return <AccessDenied reason="forbidden" backTo={`/posts/${id}`} />

  return (
    <PostForm
      key={post.id} // 다른 게시글로 바뀌면 폼 상태를 새로 초기화
      heading="게시글 수정"
      author={post.author}
      initialValues={{ title: post.title, content: post.content }}
      onSubmit={handleSubmit}
      isSubmitting={updateMutation.isPending}
      submitError={updateMutation.error}
    />
  )
}

export default PostEditPage
