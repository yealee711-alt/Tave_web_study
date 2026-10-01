import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiError, fetchPost, updatePost } from '../../api/posts'

/** 게시글 수정 페이지 (/posts/:id/edit) */
function PostEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // 기존 게시글 데이터를 불러와 form의 초기값으로 채운다
  useEffect(() => {
    if (!id) return
    let ignore = false

    async function load() {
      setLoading(true)
      setLoadError(null)
      try {
        const post = await fetchPost(id as string)
        if (!ignore) {
          setTitle(post.title)
          setContent(post.content)
          setAuthor(post.author)
        }
      } catch (err) {
        if (!ignore) {
          setLoadError(err instanceof ApiError ? err.message : '게시글을 불러오지 못했습니다.')
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

  function validate(): string | null {
    if (!title.trim()) return '제목을 입력해주세요.'
    if (!content.trim()) return '내용을 입력해주세요.'
    if (!author.trim()) return '작성자를 입력해주세요.'
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!id) return

    const message = validate()
    if (message) {
      setValidationError(message)
      return
    }

    setValidationError(null)
    setSubmitError(null)
    setSubmitting(true)
    try {
      // PATCH /posts/:id — 수정된 값들을 Request Body로 전달
      await updatePost(id, { title, content, author })
      navigate(`/posts/${id}`) // 수정 성공 시 상세 페이지로 이동
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : '게시글 수정에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="status">불러오는 중...</p>
  if (loadError) return <p className="status error">{loadError}</p>

  return (
    <div className="post-form">
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
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

export default PostEditPage
