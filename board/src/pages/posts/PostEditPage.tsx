import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, updatePost } from '../../api/posts'

function PostEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      if (!id) {
        return
      }

      try {
        const post = await getPost(Number(id))

        setTitle(post.title)
        setContent(post.content)
        setAuthor(post.author)
      } catch (error) {
        console.error(error)
        alert('게시글을 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!id) {
      return
    }

    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('제목, 내용, 작성자를 모두 입력해주세요.')
      return
    }

    try {
      await updatePost(Number(id), {
        title,
        content,
        author,
      })

      navigate(`/posts/${id}`)
    } catch (error) {
      console.error(error)
      alert('게시글 수정에 실패했습니다.')
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        게시글을 불러오는 중입니다...
      </div>
    )
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
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
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

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            수정 완료
          </button>
        </div>
      </form>
    </section>
  )
}

export default PostEditPage