import { Link, Outlet } from 'react-router-dom'
import ThemeToggle from '../components/layout/ThemeToggle'
import UserMenu from '../components/layout/UserMenu'
import { useApplyTheme } from '../hooks/useApplyTheme'

/**
 * 게시판 공통 레이아웃 (Nested Routing의 부모 라우트).
 * <Outlet />이 있는 자리에 /posts, /posts/new, /posts/:id 같은 자식 라우트가 그려진다.
 */
function BoardLayout() {
  // Zustand에 저장된 테마를 <html>에 반영
  useApplyTheme()

  return (
    <div className="board-layout">
      <header className="board-header">
        <Link to="/posts" className="board-title">
          게시판
        </Link>
        <div className="header-tools">
          <UserMenu />
          <ThemeToggle />
        </div>
      </header>

      <main className="board-content">
        <Outlet />
      </main>
    </div>
  )
}

export default BoardLayout
