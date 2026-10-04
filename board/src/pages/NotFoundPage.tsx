import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h2>
      <Link to="/posts" className="text-sm underline">
        목록으로
      </Link>
    </div>
  );
}