import { useAuth } from '../../hooks/useAuth'
import type { Post } from '../../types/post'

/** 작성자 아바타 · 이름 · 날짜. 로그인한 사용자의 글이면 "내 글" 뱃지를 붙인다 */
function PostMeta({ post }: { post: Post }) {
  const { isAuthor } = useAuth()

  return (
    <div className="post-meta">
      <span className="avatar" aria-hidden="true">
        {post.author.charAt(0)}
      </span>
      <span className="author">{post.author}</span>
      {isAuthor(post) && <span className="badge">내 글</span>}
      <span className="dot">·</span>
      <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</time>
    </div>
  )
}

export default PostMeta
