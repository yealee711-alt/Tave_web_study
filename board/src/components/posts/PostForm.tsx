import { useEffect, useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getErrorMessage } from '../../api/client'
import { usePostForm } from '../../hooks/usePostForm'
import type { PostFormValues } from '../../types/post'

interface PostFormProps {
  heading: string
  /** 화면에 보여줄 작성자 (작성: 로그인한 사용자, 수정: 원래 작성자) */
  author: string
  initialValues?: Partial<PostFormValues>
  onSubmit: (values: PostFormValues) => void
  isSubmitting: boolean
  /** mutation이 실패했을 때의 에러 (useMutation의 error) */
  submitError: unknown
}

/** 작성/수정 페이지가 함께 쓰는 게시글 폼 */
function PostForm({ heading, author, initialValues, onSubmit, isSubmitting, submitError }: PostFormProps) {
  const navigate = useNavigate()
  // useRef: 실제 DOM 요소(제목 input)를 직접 참조해서 focus를 제어하는 데 사용
  const titleRef = useRef<HTMLInputElement>(null)
  const { values, handleChange, validationError, validateValues } = usePostForm(initialValues)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validateValues()) {
      titleRef.current?.focus()
      return
    }
    onSubmit(values)
  }

  return (
    <div className="post-form">
      <h2>{heading}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input ref={titleRef} name="title" value={values.title} onChange={handleChange} />
        </label>
        <label>
          내용
          <textarea name="content" value={values.content} onChange={handleChange} rows={8} />
        </label>
        {/* 작성자는 로그인 정보로 정해지므로 직접 입력받지 않는다 */}
        <p className="form-author">
          작성자 <strong>{author}</strong>
        </p>

        {validationError && <p className="status error">{validationError}</p>}
        {submitError != null && (
          <p className="status error">{getErrorMessage(submitError, '저장에 실패했습니다.')}</p>
        )}

        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? '저장 중...' : '저장'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
