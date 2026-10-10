import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { useDeletePost } from '../hooks/useDeletePost';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function PostDetail() {
  const { id } = useParams(); // /posts/3 → id === "3" (문자열)
  const navigate = useNavigate();

  const { data: post, isPending, isError, error, refetch } = usePost(id); // 조회: useQuery
  const deleteMutation = useDeletePost(); // 삭제: useMutation

  if (isPending) return <Loading message="게시글을 불러오는 중입니다..." />;
  if (isError) {
    return <ErrorMessage message={`게시글을 불러오지 못했습니다. (${error.message})`} onRetry={() => refetch()} />;
  }

  // 서버가 404를 준 경우 (getPost가 null을 돌려줌)
  if (!post) {
    return (
      <EmptyState
        message="존재하지 않는 게시글입니다."
        action={
          <Link to="/posts" className="font-semibold text-dusty-rose-dark underline">
            목록으로
          </Link>
        }
      />
    );
  }

  const handleDelete = () => {
    if (!confirm('정말 삭제할까요?')) return;
    deleteMutation.mutate(post.id, {
      onSuccess: () => navigate('/posts'), // 삭제 후 목록으로 (목록은 invalidate로 최신화)
      onError: (err) => alert(`삭제하지 못했습니다. (${err.message})`),
    });
  };

  const btn = 'rounded-md border border-rose-200 px-3 py-1.5 text-sm text-dusty-rose-dark hover:bg-rose-50';

  return (
    <div>
      {/* 게시글 전체를 감싸는 블록 */}
      <article className="rounded-xl border border-rose-100 bg-white p-6">
        <h2 className="break-all text-xl font-bold text-dusty-rose-dark">{post.title}</h2>
        <p className="ml-0.5 mt-2 text-[11px] text-dusty-rose">{post.author}</p>

        {/* 제목 영역과 본문 사이 구분선 */}
        <hr className="my-4 border-rose-100" />

        <p className="min-h-40 whitespace-pre-wrap break-all text-sm font-medium leading-relaxed text-dusty-rose-dark">{post.content}</p>
      </article>

      {/* 버튼은 블록 바깥 아래에 */}
      <div className="mt-4 flex gap-2">
        <Link to="/posts" className={btn}>
          ← 목록
        </Link>
        <Link to={`/posts/${post.id}/edit`} className={`${btn} ml-auto`}>
          수정
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className={`${btn} hover:text-red-500 disabled:opacity-50`}
        >
          {deleteMutation.isPending ? '삭제 중...' : '삭제'}
        </button>
      </div>
    </div>
  );
}
