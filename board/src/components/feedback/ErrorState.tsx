import { Link } from 'react-router-dom'
import { ApiError, getErrorMessage } from '../../api/client'

interface ErrorStateProps {
  error: unknown
  /** 다시 시도 버튼을 누르면 호출 (보통 useQuery의 refetch) */
  onRetry?: () => void
}

/** 조회 실패 시 보여주는 에러 화면. 404면 다시 시도 대신 목록으로 돌아가는 링크만 준다 */
function ErrorState({ error, onRetry }: ErrorStateProps) {
  const notFound = error instanceof ApiError && error.status === 404

  return (
    <div className="state-box error" role="alert">
      <span className="state-icon" aria-hidden="true">
        {notFound ? '🔍' : '⚠️'}
      </span>
      <strong>{notFound ? '게시글을 찾을 수 없어요' : '문제가 발생했어요'}</strong>
      <p>{getErrorMessage(error, '데이터를 불러오지 못했습니다.')}</p>
      <div className="actions">
        {onRetry && !notFound && (
          <button type="button" className="btn btn-secondary" onClick={onRetry}>
            다시 시도
          </button>
        )}
        <Link to="/posts" className="btn btn-ghost">
          목록으로
        </Link>
      </div>
    </div>
  )
}

export default ErrorState
