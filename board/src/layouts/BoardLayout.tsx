import { Link, Outlet, useLocation } from "react-router-dom";
import Icon from "../components/Icon";

function BoardLayout() {
  const { pathname, search } = useLocation();
  const bookmarked = new URLSearchParams(search).get("bookmarks") === "true";
  const navClass = (active: boolean) => `flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-[#eeebfa] font-semibold text-[#655bab]" : "text-muted hover:bg-canvas hover:text-ink"}`;

  return (
    <div className="mx-auto min-h-screen max-w-[1440px] overflow-hidden bg-white shadow-[0_16px_70px_-25px_rgba(36,40,56,0.24)] lg:my-8 lg:min-h-[calc(100vh-4rem)] lg:rounded-[28px] xl:mx-8 2xl:mx-auto">
      <div className="flex min-h-[inherit] flex-col lg:flex-row">
        <aside className="flex shrink-0 flex-col border-b border-line bg-white px-4 py-5 sm:px-6 lg:w-56 lg:border-r lg:border-b-0 lg:px-6 lg:py-9">
          <Link to="/posts" className="flex items-center gap-3 px-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-ink text-white"><Icon name="note" /></span>
            <span className="text-sm font-bold tracking-[0.22em]">TAVE<span className="mt-0.5 block text-[9px] font-medium tracking-[0.18em] text-muted">STUDY BOARD</span></span>
          </Link>
          <nav aria-label="게시판 메뉴" className="mt-5 flex flex-wrap gap-1 lg:mt-12 lg:flex-col lg:gap-2">
            <Link to="/posts/new" className={navClass(pathname === "/posts/new")}><Icon name="plus" />새 글 작성</Link>
            <Link to="/posts" className={navClass(pathname === "/posts" && !bookmarked)}><Icon name="grid" />전체 게시글</Link>
            <Link to="/posts?bookmarks=true" className={navClass(pathname === "/posts" && bookmarked)}><Icon name="bookmark" />내 북마크</Link>
          </nav>
          <div className="mt-auto hidden pt-16 lg:block">
            <div className="rounded-2xl bg-canvas p-4">
              <div className="mb-3 flex gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-[#b5dce9]" /><span className="size-2.5 rounded-full bg-[#efbcc0]" /><span className="size-2.5 rounded-full bg-[#e8e795]" /></div>
              <p className="text-xs font-semibold">작은 기록, 함께하는 성장</p>
              <p className="mt-2 text-[11px] leading-5 text-muted">배운 것과 떠오른 생각을<br />차곡차곡 모아보세요.</p>
            </div>
            <p className="mt-5 px-2 text-[9px] tracking-[0.15em] text-muted">TAVE · FRONTEND STUDY</p>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between gap-4 px-5 py-6 sm:px-9 lg:px-11 lg:py-8">
            <Link to="/posts" className="text-xl font-semibold tracking-tight sm:text-2xl">MY BOARD<span className="ml-2 text-accent">.</span></Link>
            <span className="rounded-full border border-line px-3 py-1.5 text-[10px] font-medium tracking-wider text-muted">TAVE STUDY</span>
          </header>
          <main className="min-h-[calc(100vh-12rem)] bg-canvas px-5 py-7 sm:px-9 lg:px-11 lg:py-9"><Outlet /></main>
        </div>
      </div>
    </div>
  );
}

export default BoardLayout;
