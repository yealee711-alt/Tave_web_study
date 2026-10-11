import { Link } from 'react-router-dom'

interface AccessDeniedProps {
  /** login: 로그인 안 함(401) / forbidden: 작성자가 아님(403) */
  reason: 'login' | 'forbidden'
  /** 돌아갈 곳 (기본: 목록) */
  backTo?: string
}

const MESSAGES = {
  login: {
    icon: '🔒',
    title: '로그인이 필요해요',
    description: '오른쪽 위에서 닉네임으로 로그인한 뒤 다시 시도해주세요.',
  },
  forbidden: {
    icon: '🚫',
    title: '권한이 없어요',
    description: '본인이 작성한 글만 수정하거나 삭제할 수 있어요.',
  },
}

/** 권한이 없어서 화면을 보여줄 수 없을 때 */
function AccessDenied({ reason, backTo = '/posts' }: AccessDeniedProps) {
  const { icon, title, description } = MESSAGES[reason]

  return (
    <div className="state-box" role="alert">
      <span className="state-icon" aria-hidden="true">
        {icon}
      </span>
      <strong>{title}</strong>
      <p>{description}</p>
      <div className="actions">
        <Link to={backTo} className="btn btn-secondary">
          돌아가기
        </Link>
      </div>
    </div>
  )
}

export default AccessDenied
