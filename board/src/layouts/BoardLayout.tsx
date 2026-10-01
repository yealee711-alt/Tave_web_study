import { Link, Outlet, useLocation } from 'react-router-dom'

/**
 * 게시판 공통 레이아웃 (Nested Routing의 부모 라우트).
 * <Outlet />이 있는 자리에 /posts, /posts/new, /posts/:id 같은 자식 라우트가 그려진다.
 */
function BoardLayout() {
  // useLocation: 현재 URL 경로를 읽어서, 지금 어떤 하위 화면인지 UI에 표시하는 데 사용
  const location = useLocation()

  return (
    <div className="board-layout">
      <header className="board-header">
        <Link to="/posts" className="board-title">
          게시판
        </Link>
        <span className="board-path">{location.pathname}</span>
      </header>

      <main className="board-content">
        <Outlet />
      </main>
    </div>
  )
}

export default BoardLayout
