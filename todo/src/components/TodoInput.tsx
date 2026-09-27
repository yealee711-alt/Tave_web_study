import { useState, type FormEvent } from 'react';
import {
  TODO_CATEGORIES,
  type TodoCategory,
} from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string, category: TodoCategory) => void;
}

const MAX_LENGTH = 40;
const WARNING_LENGTH = 32;

function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<TodoCategory>('공부');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    onAdd(trimmedText, category);
    setText('');
  };

  const counterColor =
    text.length === MAX_LENGTH
      ? 'text-rose-500'
      : text.length >= WARNING_LENGTH
        ? 'text-amber-500'
        : 'text-slate-400';

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          className="rounded-2xl border border-violet-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as TodoCategory)
          }
          aria-label="카테고리 선택"
        >
          {TODO_CATEGORIES.map((todoCategory) => (
            <option key={todoCategory} value={todoCategory}>
              {todoCategory}
            </option>
          ))}
        </select>

        <div className="relative flex-1">
          <input
            className="w-full rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4 pr-16 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            type="text"
            value={text}
            maxLength={MAX_LENGTH}
            onChange={(event) => setText(event.target.value)}
            placeholder="오늘 할 일을 입력해 주세요"
            aria-label="할 일 입력"
          />

          <span
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold transition-colors ${counterColor}`}
            aria-live="polite"
          >
            {text.length}/{MAX_LENGTH}
          </span>
        </div>

        <button
          className="rounded-2xl bg-violet-600 px-7 py-4 font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          type="submit"
          disabled={!text.trim()}
        >
          추가
        </button>
      </div>
        {text.length === MAX_LENGTH && (
          <p className="text-right text-xs text-rose-500">
          최대 40자까지 입력할 수 있어요.
          </p>
        )}
    </form>
  );
}

export default TodoInput;