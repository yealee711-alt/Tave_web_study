import { useState, type ChangeEvent } from 'react'
import type { PostFormValues } from '../types/post'

const EMPTY_VALUES: PostFormValues = { title: '', content: '' }

function validate(values: PostFormValues): string | null {
  if (!values.title.trim()) return '제목을 입력해주세요.'
  if (!values.content.trim()) return '내용을 입력해주세요.'
  return null
}

/**
 * 작성/수정 폼이 공통으로 쓰는 입력값 + 유효성 검사 로직.
 * 원래 두 페이지에 똑같이 복붙되어 있던 useState와 validate()를 한 곳으로 모았다.
 */
export function usePostForm(initialValues?: Partial<PostFormValues>) {
  const [values, setValues] = useState<PostFormValues>({ ...EMPTY_VALUES, ...initialValues })
  const [validationError, setValidationError] = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  /** 검사를 통과하면 true. 실패하면 에러 메시지를 상태에 담고 false */
  function validateValues(): boolean {
    const message = validate(values)
    setValidationError(message)
    return message === null
  }

  return { values, handleChange, validationError, validateValues }
}
