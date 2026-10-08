import { Link, Outlet, useLocation } from 'react-router-dom';

const MENUS = [
  { to: '/posts', label: '목록' },
  { to: '/posts/new', label: '글쓰기' },
];

export default function BoardLayout() {
  const { pathname } = useLocation(); // 현재 주소로 메뉴 활성화 표시

  return (
    <div className="mx-auto my-12 min-h-[80vh] w-full max-w-lg rounded-xl border border-rose-100 bg-white p-8 shadow-lg">
      <header className="mb-6 flex items-center justify-between">
        <Link to="/posts" className="text-2xl font-extrabold text-dusty-rose-dark">
          게시판
        </Link>
        <nav className="flex gap-3 text-sm font-semibold">
          {MENUS.map((menu) => (
            <Link
              key={menu.to}
              to={menu.to}
              className={
                pathname === menu.to
                  ? 'text-dusty-rose-dark underline underline-offset-4'
                  : 'text-dusty-rose-dark hover:text-dusty-rose-dark'
              }
            >
              {menu.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
