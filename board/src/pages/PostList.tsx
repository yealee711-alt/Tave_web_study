import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import BookmarkButton from "../components/BookmarkButton";
import useBookmarkStore from "../stores/useBookmarkStore";
import Icon from "../components/Icon";

const cardColors = [
  "bg-[#e4e5a1]",
  "bg-[#efb8bd]",
  "bg-[#a5cfe4]",
  "bg-[#d8d1ef]",
  "bg-[#f2d6b2]",
  "bg-[#c7dfd2]",
];
function cardColor(id: string) {
  const seed = Array.from(id).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  return cardColors[seed % cardColors.length];
}

function PostList() {
  const {
    data: posts = [],
    isPending: loading,
    error: queryError,
  } = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  const error = queryError?.message ?? "";
  const bookmarkedIds = useBookmarkStore((state) => state.bookmarkedIds);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const onlyBookmarks = searchParams.get("bookmarks") === "true";
  const bookmarkedCount = posts.filter((post) =>
    bookmarkedIds.includes(post.id),
  ).length;
  const authorCount = new Set(posts.map((post) => post.author)).size;
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase()) &&
      (!onlyBookmarks || bookmarkedIds.includes(post.id)),
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = new FormData(event.currentTarget)
      .get("search")
      ?.toString()
      .trim();
    const nextParams = new URLSearchParams(searchParams);
    if (searchValue) nextParams.set("q", searchValue);
    else nextParams.delete("q");
    setSearchParams(nextParams);
  };
  const handleReset = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("q");
    setSearchParams(nextParams);
  };
  const handleBookmarkFilter = (enabled: boolean) => {
    const nextParams = new URLSearchParams(searchParams);
    if (enabled) nextParams.set("bookmarks", "true");
    else nextParams.delete("bookmarks");
    setSearchParams(nextParams);
  };
  const emptyMessage = keyword
    ? "검색 결과가 없습니다."
    : onlyBookmarks
      ? "아직 북마크한 게시글이 없어요."
      : "아직 게시글이 없어요. 첫 번째 기록을 남겨보세요.";
  const statValue = (value: number) =>
    loading || error ? "—" : String(value).padStart(2, "0");

  return (
    <div className="mx-auto max-w-6xl">
      <section aria-label="게시판 현황" className="mb-10">
        <div className="mb-5">
          <p className="eyebrow mb-2">YOUR STUDY SPACE</p>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            함께 쌓아가는 기록
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          <div className="flex items-center justify-between rounded-2xl bg-[#dff0fa] p-5 sm:block sm:p-6">
            <Icon name="note" className="size-8 text-[#8a82ce]" />
            <div className="sm:mt-5">
              <p className="text-sm font-semibold">전체 게시글</p>
              <p className="mt-1 text-xs text-ink/60">
                우리의 배움이 담긴 공간
              </p>
            </div>
            <span className="text-2xl font-semibold sm:mt-4 sm:block">
              {statValue(posts.length)}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#fbdcdb] p-5 sm:block sm:p-6">
            <Icon name="bookmark" className="size-8 text-[#b87962]" />
            <div className="sm:mt-5">
              <p className="text-sm font-semibold">내 북마크</p>
              <p className="mt-1 text-xs text-ink/60">다시 읽고 싶은 이야기</p>
            </div>
            <span className="text-2xl font-semibold sm:mt-4 sm:block">
              {statValue(bookmarkedCount)}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#f5f3d6] p-5 sm:block sm:p-6">
            <Icon name="people" className="size-8 text-[#aba949]" />
            <div className="sm:mt-5">
              <p className="text-sm font-semibold">작성자</p>
              <p className="mt-1 text-xs text-ink/60">기록을 나눈 이름들</p>
            </div>
            <span className="text-2xl font-semibold sm:mt-4 sm:block">
              {statValue(authorCount)}
            </span>
          </div>
        </div>
      </section>
      <section aria-labelledby="posts-heading">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="posts-heading" className="text-xl font-semibold">
              {onlyBookmarks ? "내 북마크" : "게시글 모아보기"}
            </h2>
            <p className="mt-1 text-xs text-muted">
              {loading
                ? "기록을 불러오고 있어요."
                : error
                  ? "연결 상태를 확인해주세요."
                  : `${filteredPosts.length}개의 이야기가 기다리고 있어요.`}
            </p>
          </div>
          <Link to="/posts/new" className="btn btn-primary">
            <Icon name="plus" className="size-4" />새 글 작성
          </Link>
        </div>
        <form onSubmit={handleSearch} className="mb-5 flex flex-wrap gap-2">
          <div className="relative min-w-0 flex-1 basis-48">
            <Icon
              name="search"
              className="pointer-events-none absolute top-3.5 left-4 size-4 text-muted"
            />
            <input
              key={keyword}
              name="search"
              type="search"
              aria-label="게시글 제목 검색"
              placeholder="어떤 기록을 찾고 있나요?"
              defaultValue={keyword}
              className="form-input bg-white pl-11"
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            검색
          </button>
          {keyword && (
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
            >
              검색 초기화
            </button>
          )}
        </form>
        <div
          className="mb-6 flex gap-5 border-b border-line"
          aria-label="게시글 필터"
        >
          <button
            type="button"
            aria-pressed={!onlyBookmarks}
            onClick={() => handleBookmarkFilter(false)}
            className={`min-h-11 border-b-2 px-1 pb-3 text-sm transition ${!onlyBookmarks ? "border-ink font-semibold text-ink" : "border-transparent text-muted hover:text-ink"}`}
          >
            전체 게시글
          </button>
          <button
            type="button"
            aria-pressed={onlyBookmarks}
            onClick={() => handleBookmarkFilter(true)}
            className={`min-h-11 border-b-2 px-1 pb-3 text-sm transition ${onlyBookmarks ? "border-ink font-semibold text-ink" : "border-transparent text-muted hover:text-ink"}`}
          >
            북마크만 보기
          </button>
        </div>
        {loading && (
          <div
            role="status"
            className="rounded-2xl border border-line bg-white px-5 py-16 text-center text-sm text-muted"
          >
            게시글을 불러오는 중...
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="rounded-2xl bg-rose-50 px-5 py-12 text-center text-sm text-rose-700"
          >
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            {filteredPosts.length === 0 && (
              <div
                role="status"
                className="mb-5 rounded-2xl border border-dashed border-[#d4d5df] p-8 text-center"
              >
                <Icon name="note" className="mx-auto mb-4 size-8 text-accent" />
                <p className="text-sm leading-6 text-muted">{emptyMessage}</p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className={`group flex min-h-64 flex-col rounded-2xl p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none ${cardColor(post.id)}`}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="eyebrow text-ink/60">STUDY NOTE</span>
                    <Icon name="note" className="size-5 text-ink/60" />
                  </div>
                  <Link to={`/posts/${post.id}`} className="block rounded-sm">
                    <h3 className="line-clamp-2 break-words text-lg font-semibold leading-7 group-hover:underline decoration-ink/30 underline-offset-4">
                      {post.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 whitespace-pre-wrap break-words border-t border-ink/10 pt-4 text-sm leading-6 text-ink/70">
                      {post.content}
                    </p>
                  </Link>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-6">
                    <span className="max-w-full break-words text-xs text-ink/70">
                      {post.author}
                    </span>
                    <BookmarkButton postId={post.id} />
                  </div>
                </article>
              ))}
              <Link
                to="/posts/new"
                className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#c9cbd7] text-muted transition hover:border-accent hover:bg-white hover:text-accent"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-white">
                  <Icon name="plus" />
                </span>
                <span className="text-sm font-medium">새로운 기록 남기기</span>
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default PostList;
