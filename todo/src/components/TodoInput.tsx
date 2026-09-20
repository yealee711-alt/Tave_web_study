import { useState, type FormEvent } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const MAX_LENGTH = 40;

function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    onAdd(trimmedText);
    setText('');
  };

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={handleSubmit}
    >
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

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
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
    </form>
  );
}

export default TodoInput;