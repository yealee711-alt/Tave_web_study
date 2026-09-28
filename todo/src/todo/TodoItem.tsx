import { useState, type ChangeEvent } from 'react';
import type { Todo } from './todoSlice';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  // 수정 모드 State는 이 항목에서만 필요하므로 TodoItem 안에서 관리
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const startEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const submitEdit = () => {
    const trimmed = editText.trim();
    if (trimmed.length < 2) {
      alert('2글자 이상 입력해주세요.');
      return;
    }
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  return (
    <li className="flex items-center gap-3 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 shrink-0 cursor-pointer accent-gray-800"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submitEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          autoFocus
          className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-gray-800"
        />
      ) : (
        <span
          className={`flex-1 break-all text-sm transition-all ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          [{todo.category}] {todo.text}
        </span>
      )}

      {isEditing ? (
        <>
          <button
            onClick={submitEdit}
            className="shrink-0 text-xs font-medium text-blue-500 hover:text-blue-700"
          >
            저장
          </button>
          <button
            onClick={cancelEdit}
            className="shrink-0 text-xs font-medium text-gray-400 hover:text-gray-700"
          >
            취소
          </button>
        </>
      ) : (
        <button
          onClick={startEdit}
          className="shrink-0 text-xs font-medium text-gray-400 hover:text-gray-700"
        >
          수정
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 text-xs font-medium text-gray-400 transition-colors hover:text-red-500"
      >
        삭제
      </button>
    </li>
  );
}
