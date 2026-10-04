import Button from './common/Button';

interface PaginationProps {
  page: number;
  hasNext: boolean;
  onChange: (page: number) => void;
}

export default function Pagination({ page, hasNext, onChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button onClick={() => onChange(page - 1)} disabled={page <= 1}>
        이전
      </Button>
      <span className="text-sm">{page} 페이지</span>
      <Button onClick={() => onChange(page + 1)} disabled={!hasNext}>
        다음
      </Button>
    </div>
  );
}