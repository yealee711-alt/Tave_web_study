import { useState } from 'react';
import type { SubmitEvent } from 'react';
import Input from './common/Input';
import Button from './common/Button';

const MAX_LENGTH = 50;

interface TextInputProps {
  onAdd: (text: string) => void;
}

export default function TextInput({ onAdd }: TextInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={MAX_LENGTH}
        placeholder="할 일을 입력하세요"
        className="flex-1"
      />
      <span className="self-center text-sm">
        {value.length}/{MAX_LENGTH}
      </span>
      <Button type="submit" disabled={!value.trim()}>
        추가
      </Button>
    </form>
  );
}