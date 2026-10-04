import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../api/posts'

function PostCreatePage() {
  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('제목, 내용, 작성자를 모두 입력해주세요.')
      return
    }

    try {
      const newPost = await createPost({
        title,
        content,
        author,
      })

      navigate(`/posts/${newPost.id}`)
    } catch (error) {
      console.error(error)
      alert('게시글 작성에 실패했습니다.')
    }
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          게시글 작성
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          새로운 게시글을 작성해주세요.
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
            ref={titleRef}
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력하세요"
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
            placeholder="작성자를 입력하세요"
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
            placeholder="내용을 입력하세요"
            rows={10}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/posts')}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            등록
          </button>
        </div>
      </form>
    </section>
  )
}

export default PostCreatePage