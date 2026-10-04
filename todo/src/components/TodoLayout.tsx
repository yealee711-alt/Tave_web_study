import { Link, Outlet, useLocation } from 'react-router-dom';

const MENUS = [
  { to: '/todos', label: '목록' },
  { to: '/todos/new', label: '+ 새 할 일' },
];

export default function TodoLayout() {
  // ⭐ 지금 주소 정보 꺼내기  예) /todos/new → pathname은 "/todos/new"
  const { pathname } = useLocation();

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
      <header className="mb-6 flex items-center justify-between">
        <Link to="/todos" className="text-2xl font-extrabold text-gray-800">
          할 일 관리
        </Link>
        <nav className="flex gap-3 text-sm font-semibold">
          {MENUS.map((menu) => {
            const isActive = pathname === menu.to; // 지금 보고 있는 메뉴인가?
            return (
              <Link
                key={menu.to}
                to={menu.to}
                className={isActive ? 'text-gray-800 underline underline-offset-4' : 'text-gray-400 hover:text-gray-800'}
              >
                {menu.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
