
import { Link, Outlet } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

function BoardLayout() {
  const authorName = useUserStore((state) => state.authorName)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link
            to="/posts"
            className="text-2xl font-bold text-gray-900"
          >
            Board
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              작성자: {authorName || '미설정'}
            </span>

            <Link
              to="/posts/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              글쓰기
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default BoardLayout
