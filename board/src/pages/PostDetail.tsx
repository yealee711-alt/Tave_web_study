import { Link, useParams, useNavigate } from "react-router-dom";
import { deletePost } from "../api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePost from "../hooks/usePost";
import BookmarkButton from "../components/BookmarkButton";
import useBookmarkStore from "../stores/useBookmarkStore";
import StatePanel from "../components/StatePanel";
import Icon from "../components/Icon";

function PostDetail() {
  const { id } = useParams();
  const { data: post, isPending: loading, error: loadError } = usePost(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const deleteMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: async (_, deletedId) => {
      removeBookmark(deletedId);

      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.removeQueries({
        queryKey: ["post", deletedId],
        exact: true,
      });

      navigate("/posts");
    },
  });

  const isDeleting = deleteMutation.isPending;
  const deleteError = deleteMutation.error?.message ?? "";

  // DELETE 기능 수현 - 삭제 함수 추가
  const handleDelete = () => {
    if (deleteMutation.isPending || !id) return;

    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) return;

    deleteMutation.mutate(id);
  };

  if (!id) return <StatePanel message="게시글 ID가 없습니다." error />;
  if (loading) return <StatePanel message="게시글을 불러오는 중..." loading />;
  if (loadError && !post) return <StatePanel message={loadError.message} error />;
  if (!post) return <StatePanel message="게시글이 없습니다." />;
  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/posts" className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm text-muted transition hover:text-ink"><Icon name="arrow" className="size-4" />게시글 목록</Link>
      <article className="paper">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><span className="eyebrow">STUDY NOTE</span><BookmarkButton postId={post.id} disabled={isDeleting} /></div>
        <h1 className="break-words text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{post.title}</h1>
        <div className="mt-5 flex items-center gap-3 border-b border-line pb-7"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eeebfa] text-sm font-semibold text-accent">{post.author.slice(0, 1)}</span><div className="min-w-0"><p className="break-words text-sm font-medium">{post.author}</p><p className="mt-0.5 text-[10px] text-muted">작성자</p></div></div>
        <div className="min-h-60 whitespace-pre-wrap break-words py-8 text-[15px] leading-8 text-ink/80">{post.content}</div>
        {deleteError && <p role="alert" className="mb-5 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{deleteError}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <Link to="/posts" className="btn btn-secondary"><Icon name="arrow" className="size-4" />목록으로</Link>
          <div className="flex gap-2"><Link to={`/posts/${id}/edit`} className="btn btn-primary"><Icon name="edit" className="size-4" />수정</Link><button type="button" onClick={handleDelete} disabled={isDeleting} className="btn btn-danger"><Icon name="trash" className="size-4" />{isDeleting ? "삭제 중..." : "삭제"}</button></div>
        </div>
      </article>
    </div>
  );
}

export default PostDetail;
