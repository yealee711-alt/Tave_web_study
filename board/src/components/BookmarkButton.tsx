import useBookmarkStore from "../stores/useBookmarkStore";
import Icon from "./Icon";

interface BookmarkButtonProps { postId: string; disabled?: boolean; }

function BookmarkButton({ postId, disabled = false }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) => state.bookmarkedIds.includes(postId));
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  return (
    <button type="button" aria-pressed={isBookmarked} disabled={disabled} onClick={() => toggleBookmark(postId)}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${isBookmarked ? "bg-ink text-white hover:bg-[#424760]" : "bg-white/60 text-ink hover:bg-white"}`}>
      <Icon name="bookmark" className="size-4" fill={isBookmarked ? "currentColor" : "none"} />
      {isBookmarked ? "북마크 해제" : "북마크"}
    </button>
  );
}

export default BookmarkButton;
