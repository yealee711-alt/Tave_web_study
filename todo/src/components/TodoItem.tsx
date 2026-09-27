import { useState, type FormEvent } from 'react';
import {
  TODO_CATEGORIES,
  type Todo,
  type TodoCategory,
} from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    text: string,
    category: TodoCategory,
  ) => void;
}

const categoryStyles: Record<TodoCategory, string> = {
  공부: 'bg-violet-100 text-violet-700',
  일정: 'bg-sky-100 text-sky-700',
  생활: 'bg-emerald-100 text-emerald-700',
  기타: 'bg-slate-100 text-slate-600',
};

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] =
    useState<TodoCategory>(todo.category);

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = editText.trim();

    if (!trimmedText) {
      return;
    }

    onEdit(todo.id, trimmedText, editCategory);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    setEditCategory(todo.category);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="rounded-2xl border border-violet-300 bg-violet-50 p-4">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleEditSubmit}
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              className="rounded-xl border border-violet-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              value={editCategory}
              onChange={(event) =>
                setEditCategory(event.target.value as TodoCategory)
              }
              aria-label={`${todo.text} 카테고리 수정`}
            >
              {TODO_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              className="min-w-0 flex-1 rounded-xl border border-violet-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              type="text"
              value={editText}
              maxLength={40}
              onChange={(event) => setEditText(event.target.value)}
              aria-label={`${todo.text} 내용 수정`}
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
              type="button"
              onClick={cancelEdit}
            >
              취소
            </button>

            <button
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              type="submit"
              disabled={!editText.trim()}
            >
              저장
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-2xl border p-4 transition ${
        todo.completed
          ? 'border-slate-200 bg-slate-50'
          : 'border-violet-100 bg-white hover:border-violet-300 hover:shadow-sm'
      }`}
    >
      <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
        <input
          className="peer sr-only"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-violet-300 text-sm font-bold text-transparent transition peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-checked:text-white">
          ✓
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`mr-2 inline-block rounded-full px-2 py-1 align-middle text-xs font-semibold ${categoryStyles[todo.category]}`}
          >
            {todo.category}
          </span>

          <span
            className={`break-all align-middle text-sm sm:text-base ${
              todo.completed
                ? 'text-slate-400 line-through'
                : 'text-slate-700'
            }`}
          >
            {todo.text}
          </span>
        </span>
      </label>

      <div className="flex shrink-0 gap-2">
        <button
          className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-600 hover:text-white"
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label={`${todo.text} 수정`}
        >
          수정
        </button>

        <button
          className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label={`${todo.text} 삭제`}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoItem;