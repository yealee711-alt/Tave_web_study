import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mt-24 text-center">
      <h1 className="text-5xl font-extrabold text-dusty-rose">404</h1>
      <p className="mt-3 text-dusty-rose">페이지를 찾을 수 없어요.</p>
      <Link to="/posts" className="mt-4 inline-block font-semibold text-dusty-rose underline">
        게시판으로 가기
      </Link>
    </div>
  );
}
