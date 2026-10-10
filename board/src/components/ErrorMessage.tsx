interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; // 있으면 [다시 시도] 버튼 표시
}

// Error UI: 요청 실패
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center text-sm text-red-500">
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md border border-rose-200 px-3 py-1.5 text-sm text-dusty-rose-dark hover:bg-rose-50"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
