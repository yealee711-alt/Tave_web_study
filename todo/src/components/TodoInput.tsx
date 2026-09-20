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
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          value={text}
          maxLength={MAX_LENGTH}
          onChange={(event) => setText(event.target.value)}
          placeholder="오늘 할 일을 입력해 주세요"
          aria-label="할 일 입력"
        />

        <span className="character-count">
          {text.length}/{MAX_LENGTH}
        </span>
      </div>

      <button
        className="add-button"
        type="submit"
        disabled={!text.trim()}
      >
        추가
      </button>
    </form>
  );
}

export default TodoInput;
