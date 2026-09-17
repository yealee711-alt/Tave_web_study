import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from './Button';

// 할 일 글자 수 제한
const MAX_LENGTH = 30;

interface TextInputProps {
  // 새 할 일이 추가될 때 부모(App)에게 텍스트를 전달하는 콜백
  onAdd: (text: string) => void;
}

export default function TextInput({ onAdd }: TextInputProps) {
  // 입력창의 현재 값을 관리하는 상태
  const [value, setValue] = useState('');

  const remaining = MAX_LENGTH - value.length;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = value.trim();
    if (trimmed.length === 0) return; // 빈 값은 추가하지 않음

    onAdd(trimmed);
    setValue(''); // 추가 후 입력창 비우기
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-start gap-2">
      <div className="flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={MAX_LENGTH}
          placeholder="할 일을 입력하세요"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        />
        <p className="mt-1 text-right text-xs text-gray-400">
          {value.length} / {MAX_LENGTH}자{remaining === 0 && ' (최대 글자 수 도달)'}
        </p>
      </div>
      <Button type="submit" className="bg-gray-800 text-white hover:bg-gray-700">
        추가
      </Button>
    </form>
  );
}
