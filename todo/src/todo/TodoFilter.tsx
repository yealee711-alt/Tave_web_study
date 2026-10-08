// Union Type: 필터는 이 세 값 중 하나만 가능
export type Filter = 'all' | 'active' | 'completed';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'completed', label: '완료' },
];

interface TodoFilterProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

export default function TodoFilter({ filter, onChange }: TodoFilterProps) {
  return (
    <div className="mb-4 flex gap-2">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
            filter === value
              ? 'bg-gray-800 text-white'
              : 'border border-gray-300 text-gray-500 hover:bg-gray-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
