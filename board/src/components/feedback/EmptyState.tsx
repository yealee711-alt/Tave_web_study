import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

/** 보여줄 데이터가 없을 때 (게시글 0개, 검색 결과 없음) */
function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="state-box empty">
      <span className="state-icon" aria-hidden="true">
        📭
      </span>
      <strong>{title}</strong>
      {description && <p>{description}</p>}
      {action && <div className="actions">{action}</div>}
    </div>
  )
}

export default EmptyState
