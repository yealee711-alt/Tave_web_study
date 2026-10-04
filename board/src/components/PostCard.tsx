import { Link } from 'react-router';
import type { Post } from '../types/posts';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li className="border border-gray-300 p-4">
      <Link to={`/posts/${post.id}`} className="flex flex-col gap-1">
        <span className="font-semibold">{post.title}</span>
        <span className="line-clamp-2 text-sm text-gray-600">{post.content}</span>
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString('ko-KR')}
        </span>
      </Link>
    </li>
  );
}