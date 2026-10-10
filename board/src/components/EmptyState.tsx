import type { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  action?: ReactNode; // 다음에 할 일 (예: 글쓰기 링크)
}

// Empty State: 요청은 성공했지만 보여줄 데이터가 없음 (에러 아님!)
export default function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center text-sm text-dusty-rose-dark">
      <p>{message}</p>
      {action}
    </div>
  );
}
