
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePost, useDeletePost } from '../../hooks/usePosts'

function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: post,
    isPending,
    isError,
    error,
    refetch,
  } = usePost(id)

  const deleteMutation = useDeletePost()

  async function handleDelete() {
    if (!post || deleteMutation.isPending) return

    const confirmed = window.confirm(
      '정말 이 게시글을 삭제하시겠습니까?'
    )

    if (!confirmed) return

    try {
      await deleteMutation.mutateAsync(post.id)
      navigate('/posts')
    } catch {
      // 오류는 아래 Error UI에서 표시
    }
  }

  if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        잘못된 게시글 주소입니다.
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="py-20 text-center text-gray-500">
        게시글을 불러오는 중입니다...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-red-500">{error.message}</p>
        <button
          onClick={() => void refetch()}
          className="text-blue-600 hover:underline"
        >
          다시 시도
        </button>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-gray-500">
          게시글을 찾을 수 없습니다.
        </p>
        <Link to="/posts" className="text-blue-600">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <section>
      <div className="mb-6">
        <Link
          to="/posts"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← 목록으로
        </Link>
      </div>

      <article className="rounded-xl border border-gray-200 bg-white p-8">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>{post.author}</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="min-h-60 whitespace-pre-wrap py-8 text-gray-700">
          {post.content}
        </div>

        {deleteMutation.isError && (
          <p className="mb-4 text-sm text-red-500">
            {deleteMutation.error.message}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
          <Link
            to={`/posts/${post.id}/edit`}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            수정
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </article>
    </section>
  )
}

export default PostDetailPage
