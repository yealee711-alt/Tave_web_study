interface LoadingProps {
  message?: string;
}

// Loading UI: 요청 중
export default function Loading({ message = '불러오는 중입니다...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-sm text-dusty-rose">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-rose-200 border-t-rose-400" />
      <p>{message}</p>
    </div>
  );
}
