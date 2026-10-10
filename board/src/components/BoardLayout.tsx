import { useState, type FormEvent } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const MENUS = [
  { to: '/posts', label: '목록' },
  { to: '/posts/new', label: '글쓰기' },
];

export default function BoardLayout() {
  const { pathname } = useLocation(); // 현재 주소로 메뉴 활성화 표시

  // Zustand: 필요한 값만 골라서 가져오기 (store 통째로 가져오면 불필요한 리렌더링)
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  // 로그인 입력창은 헤더에서만 쓰는 Local State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    setUser({ name: name.trim() }); // 전역 상태에 저장 → 어느 페이지에서든 사용 가능
    setName('');
    setIsLoginOpen(false);
  };

  return (
    <div className="mx-auto my-12 min-h-[80vh] w-full max-w-lg rounded-xl border border-rose-100 bg-white p-8 shadow-lg">
      <header className="mb-6">
        <div className="flex items-center justify-between">
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
        </div>

        {/* 전역 상태(사용자)를 보여주는 곳 */}
        <div className="mt-2 flex justify-end gap-2 text-[11px] text-dusty-rose">
          {user ? (
            <>
              <span>{user.name}님</span>
              <button onClick={clearUser} className="underline hover:text-dusty-rose-dark">
                로그아웃
              </button>
            </>
          ) : isLoginOpen ? (
            <form onSubmit={handleLogin} className="flex items-center gap-1.5">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="닉네임"
                className="w-24 rounded border border-rose-200 px-2 py-0.5 text-[11px] outline-none focus:border-rose-300"
              />
              <button type="submit" className="rounded bg-rose-200 px-2 py-0.5 text-dusty-rose-dark hover:bg-rose-300">
                확인
              </button>
              <button type="button" onClick={() => setIsLoginOpen(false)} className="underline hover:text-dusty-rose-dark">
                취소
              </button>
            </form>
          ) : (
            <button onClick={() => setIsLoginOpen(true)} className="underline hover:text-dusty-rose-dark">
              로그인
            </button>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
