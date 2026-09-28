import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Category } from './todoSlice';

interface TodoFormProps {
  onAdd: (text: string, category: Category) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('study');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed.length < 2) {
      alert('2글자 이상 입력해주세요.');
      return;
    }
    onAdd(trimmed, category);
    setText('');
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as Category);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="새로운 할 일을 입력하세요"
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm outline-none transition-all focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
      />
      <select
        value={category}
        onChange={handleCategoryChange}
        className="rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
      >
        <option value="study">공부</option>
        <option value="work">업무</option>
        <option value="etc">기타</option>
      </select>
      <button
        type="submit"
        className="shrink-0 rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
      >
        추가
      </button>
    </form>
  );
}
