import { Link } from 'react-router-dom';
import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

// 목록의 게시글 한 줄
export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.id}`} className="flex flex-col gap-1.5 px-3 py-5 hover:bg-rose-50">
      <span className="truncate text-base font-medium text-dusty-rose-dark">{post.title}</span>
      <span className="text-[11px] text-dusty-rose-dark">{post.author}</span>
    </Link>
  );
}
