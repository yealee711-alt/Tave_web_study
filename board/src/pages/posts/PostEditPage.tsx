
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePost, useUpdatePost } from '../../hooks/usePosts'
import type { Post } from '../../types/post'

function EditForm({ post }: { post: Post }) {
  const navigate = useNavigate()
  const updateMutation = useUpdatePost()

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [author, setAuthor] = useState(post.author)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (updateMutation.isPending) return

    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('제목, 내용, 작성자를 모두 입력해주세요.')
      return
    }

    try {
      await updateMutation.mutateAsync({
        id: post.id,
        data: {
          title: title.trim(),
          content: content.trim(),
          author: author.trim(),
        },
      })

      navigate(`/posts/${post.id}`)
    } catch {
      // 오류는 Error UI에서 표시
    }
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          게시글 수정
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          게시글 내용을 수정해주세요.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-2 block text-sm font-medium text-gray-700">
            작성자
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={10}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {updateMutation.isError && (
          <p className="text-sm text-red-500">
            {updateMutation.error.message}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/posts/${post.id}`)}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {updateMutation.isPending ? '수정 중...' : '수정 완료'}
          </button>
        </div>
      </form>
    </section>
  )
}

function PostEditPage() {
  const { id } = useParams()
  const { data: post, isPending, isError, error, refetch } = usePost(id)

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
      <div className="py-20 text-center text-gray-500">
        게시글을 찾을 수 없습니다.
      </div>
    )
  }

  return <EditForm key={post.id} post={post} />
}

export default PostEditPage
