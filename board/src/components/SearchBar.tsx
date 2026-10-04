import { useEffect, useRef, useState } from 'react';
import type { SubmitEvent } from 'react';
import Input from './common/Input';
import Button from './common/Button';

interface SearchBarProps {
  initialValue: string;
  onSearch: (keyword: string) => void;
}

export default function SearchBar({ initialValue, onSearch }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="제목 또는 내용으로 검색"
        className="flex-1"
      />
      <Button type="submit">검색</Button>
      {initialValue && (
        <Button
          variant="ghost"
          onClick={() => {
            setValue('');
            onSearch('');
          }}
        >
          초기화
        </Button>
      )}
    </form>
  );
}