import { useNavigate } from 'react-router-dom'
import AccessDenied from '../../components/feedback/AccessDenied'
import PostForm from '../../components/posts/PostForm'
import { useAuth } from '../../hooks/useAuth'
import { useCreatePost } from '../../hooks/usePostMutations'
import type { PostFormValues } from '../../types/post'

/** 게시글 작성 페이지 (/posts/new) — 로그인한 사용자만 */
function PostCreatePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const createMutation = useCreatePost()

  // 로그인 안 했으면 폼 대신 안내 화면 (작성자는 로그인한 닉네임으로 정해지므로)
  if (!user) return <AccessDenied reason="login" />

  function handleSubmit(values: PostFormValues) {
    createMutation.mutate(values, {
      onSuccess: (created) => navigate(`/posts/${created.id}`, { replace: true }),
    })
  }

  return (
    <PostForm
      heading="게시글 작성"
      author={user.nickname}
      onSubmit={handleSubmit}
      isSubmitting={createMutation.isPending}
      submitError={createMutation.error}
    />
  )
}

export default PostCreatePage
