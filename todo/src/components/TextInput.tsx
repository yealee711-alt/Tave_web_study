import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Button from './Button';
import { CATEGORIES } from '../types/todo';
import type { Category } from '../types/todo';
import { CATEGORY_STYLES } from '../constants/category';
import { MAX_TEXT_LENGTH } from '../constants/todo';

interface TextInputProps {
  // 새 할 일이 추가될 때 부모(App)에게 텍스트와 카테고리를 전달하는 콜백
  onAdd: (text: string, category: Category) => void;
  // 중복 입력 검증을 위한 기존 할 일 텍스트 목록 (trim + lowercase)
  existingTexts: string[];
}

export default function TextInput({ onAdd, existingTexts }: TextInputProps) {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [error, setError] = useState('');

  const remaining = MAX_TEXT_LENGTH - value.length;
  const trimmed = value.trim();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trimmed) {
      setError('할 일을 입력해주세요.');
      return;
    }
    if (existingTexts.includes(trimmed.toLowerCase())) {
      setError('이미 등록된 할 일이에요.');
      return;
    }

    onAdd(trimmed, category);
    setValue('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-start gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          aria-label="카테고리 선택"
          className={`shrink-0 rounded-lg border px-2 py-2 text-sm font-medium outline-none transition-colors ${CATEGORY_STYLES[category]}`}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={MAX_TEXT_LENGTH}
          placeholder="할 일을 입력하세요"
          aria-invalid={Boolean(error)}
          className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400 ${
            error ? 'border-red-300' : 'border-gray-200'
          }`}
        />

        <Button
          type="submit"
          disabled={!trimmed}
          className="shrink-0 bg-gray-900 text-white hover:bg-gray-700"
        >
          추가
        </Button>
      </div>

      <div className="mt-1.5 flex items-center justify-between px-1 text-xs">
        {error ? <p className="text-red-500">{error}</p> : <span />}
        <p className="text-gray-400">
          {value.length} / {MAX_TEXT_LENGTH}자{remaining === 0 && ' · 최대 글자 수 도달'}
        </p>
      </div>
    </form>
  );
}
