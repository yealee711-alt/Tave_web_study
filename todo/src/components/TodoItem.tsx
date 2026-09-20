import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
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

        <span
          className={`break-all text-sm sm:text-base ${
            todo.completed
              ? 'text-slate-400 line-through'
              : 'text-slate-700'
          }`}
        >
          {todo.text}
        </span>
      </label>

      <button
        className="shrink-0 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.text} 삭제`}
      >
        삭제
      </button>
    </li>
  );
}

export default TodoItem;