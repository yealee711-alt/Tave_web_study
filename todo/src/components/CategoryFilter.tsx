import { CATEGORIES } from '../types/todo';
import type { Category } from '../types/todo';
import Button from './common/Button';

export type Filter = '전체' | Category;

const FILTERS: Filter[] = ['전체', ...CATEGORIES];

interface CategoryFilterProps {
  selected: Filter;
  onSelect: (filter: Filter) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2">
      {FILTERS.map((f) => (
        <Button
          key={f}
          onClick={() => onSelect(f)}
          className={
            selected === f
              ? 'bg-black text-white border-black'
              : 'bg-white text-black'
          }
        >
          {f}
        </Button>
      ))}
    </div>
  );
}