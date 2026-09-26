interface HeaderProps {
  total: number;
  completed: number;
}

// 페이지 상단 제목 + 진행 현황 영역
export default function Header({ total, completed }: HeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-900">My Todo</h1>
      {total > 0 && (
        <span className="text-xs font-medium text-gray-400">
          {completed} / {total} 완료
        </span>
      )}
    </header>
  );
}
