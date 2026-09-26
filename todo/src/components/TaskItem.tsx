import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { Todo, Category } from '../types/todo';
import { CATEGORIES } from '../types/todo';
import { CATEGORY_STYLES } from '../constants/category';
import { MAX_TEXT_LENGTH } from '../constants/todo';
import { CheckIcon, PencilIcon, TrashIcon, XIcon } from './icons';

interface TaskItemProps {
  todo: Todo;
  // 중복 입력 검증을 위해 전체 목록을 전달받아 자기 자신을 제외하고 비교
  allTodos: Todo[];
  // 완료 여부를 토글할 때 id를 부모에게 전달
  onToggle: (id: string) => void;
  // 삭제할 때 id를 부모에게 전달
  onDelete: (id: string) => void;
  // 텍스트 수정 결과를 부모에게 전달
  onEdit: (id: string, text: string) => void;
  // 카테고리 변경 결과를 부모에게 전달
  onCategoryChange: (id: string, category: Category) => void;
}

export default function TaskItem({
  todo,
  allTodos,
  onToggle,
  onDelete,
  onEdit,
  onCategoryChange,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [error, setError] = useState('');

  const existingTexts = allTodos
    .filter((t) => t.id !== todo.id)
    .map((t) => t.text.trim().toLowerCase());

  const startEdit = () => {
    setDraft(todo.text);
    setError('');
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setError('');
  };

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setError('할 일을 입력해주세요.');
      return;
    }
    if (existingTexts.includes(trimmed.toLowerCase())) {
      setError('이미 등록된 할 일이에요.');
      return;
    }
    onEdit(todo.id, trimmed);
    setIsEditing(false);
    setError('');
  };

  const handleDraftChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
    if (error) setError('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    }
    if (e.key === 'Escape') cancelEdit();
  };

  if (isEditing) {
    return (
      <li className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <input
            autoFocus
            type="text"
            value={draft}
            maxLength={MAX_TEXT_LENGTH}
            onChange={handleDraftChange}
            onKeyDown={handleKeyDown}
            aria-invalid={Boolean(error)}
            aria-label={`${todo.text} 수정`}
            className={`min-w-0 flex-1 rounded-md border px-2 py-1.5 text-sm outline-none focus:border-gray-400 ${
              error ? 'border-red-300' : 'border-gray-200'
            }`}
          />
          <button
            type="button"
            onClick={saveEdit}
            aria-label="수정 완료"
            className="shrink-0 rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50"
          >
            <CheckIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            aria-label="수정 취소"
            className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        {error && <p className="mt-1.5 pl-1 text-xs text-red-500">{error}</p>}
      </li>
    );
  }

  return (
    <li className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition-shadow hover:shadow-md">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.text} 완료 여부`}
        className="h-4 w-4 shrink-0 accent-gray-900"
      />

      <select
        value={todo.category}
        onChange={(e) => onCategoryChange(todo.id, e.target.value as Category)}
        aria-label={`${todo.text} 카테고리`}
        className={`shrink-0 rounded-md border px-1.5 py-1 text-xs font-medium outline-none ${CATEGORY_STYLES[todo.category]}`}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <span
        className={`min-w-0 flex-1 break-all text-sm ${
          todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>

      <div className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          onClick={startEdit}
          aria-label={`${todo.text} 수정`}
          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label={`${todo.text} 삭제`}
          className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
