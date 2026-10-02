import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { CATEGORIES } from '../types/todo';
import type { Category } from '../types/todo';
import Input from './common/Input';
import Button from './common/Button';
import Select from './common/Select';

const MAX_LENGTH = 50;

interface TextInputProps {
  onAdd: (text: string, category: Category) => void;
}

export default function TextInput({ onAdd }: TextInputProps) {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed, category);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={MAX_LENGTH}
        placeholder="할 일을 입력하세요"
        className="flex-1"
      />
      <span className="text-sm">
        {value.length}/{MAX_LENGTH}
      </span>
      <Button type="submit" disabled={!value.trim()}>
        추가
      </Button>
    </form>
  );
}