import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mt-24 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">404</h1>
      <p className="mt-3 text-gray-500">페이지를 찾을 수 없어요.</p>
      <Link to="/todos" className="mt-4 inline-block font-semibold text-gray-800 underline">
        홈으로 가기
      </Link>
    </div>
  );
}
