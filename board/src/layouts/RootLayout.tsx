import { Link, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 p-8">
      <header className="flex items-center justify-between border-b border-gray-300 pb-4">
        <Link to="/posts" className="text-2xl font-bold">
          게시판
        </Link>
        <Link
          to="/posts/new"
          className="flex h-9 items-center border border-gray-400 px-3 text-sm"
        >
          글쓰기
        </Link>
      </header>
      <main className="flex flex-col gap-4">
        <Outlet />
      </main>
    </div>
  );
}