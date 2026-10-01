import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiError, createPost } from '../../api/posts'

/** 게시글 작성 페이지 (/posts/new) */
function PostCreatePage() {
  // useRef: 실제 DOM 요소(제목 input)를 직접 참조해서 focus를 제어하는 데 사용
  const titleRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // 페이지 진입 시 제목 input에 자동 포커스 (useRef를 실제 DOM 제어에 사용)
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  function validate(): string | null {
    if (!title.trim()) return '제목을 입력해주세요.'
    if (!content.trim()) return '내용을 입력해주세요.'
    if (!author.trim()) return '작성자를 입력해주세요.'
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const message = validate()
    if (message) {
      setValidationError(message)
      titleRef.current?.focus()
      return
    }

    setValidationError(null)
    setSubmitError(null)
    setSubmitting(true)
    try {
      // POST /posts — 입력값을 Request Body에 담아 전송
      const created = await createPost({ title, content, author })
      navigate(`/posts/${created.id}`) // 작성 성공 시 상세 페이지로 이동
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : '게시글 작성에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="post-form">
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          내용
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
        </label>
        <label>
          작성자
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>

        {validationError && <p className="status error">{validationError}</p>}
        {submitError && <p className="status error">{submitError}</p>}

        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? '저장 중...' : '저장'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostCreatePage
