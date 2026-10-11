import { useEffect } from 'react';
import { Link, Outlet } from 'react-router';
import { useThemeStore } from '../store/themeStore';
import ThemeToggle from '../components/ThemeToggle';

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-8">
        <header className="flex items-center justify-between border-b border-gray-300 pb-4 dark:border-gray-700">
          <Link to="/posts" className="text-2xl font-bold">
            게시판
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/posts/new"
              className="flex h-9 items-center border border-gray-400 px-3 text-sm dark:border-gray-600"
            >
              글쓰기
            </Link>
          </div>
        </header>
        <main className="flex flex-col gap-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}