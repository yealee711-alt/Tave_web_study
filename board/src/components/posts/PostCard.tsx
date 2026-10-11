import { Link } from 'react-router-dom'
import type { Post } from '../../types/post'
import PostMeta from './PostMeta'

function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/posts/${post.id}`} className="post-card">
      <strong>{post.title}</strong>
      <p>{post.content}</p>
      <PostMeta post={post} />
    </Link>
  )
}

export default PostCard
