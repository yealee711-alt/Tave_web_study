import type { Todo } from '../types/todo';

interface TaskItemProps {
  todo: Todo;
  // 완료 여부를 토글할 때 id를 부모에게 전달
  onToggle: (id: string) => void;
  // 삭제할 때 id를 부모에게 전달
  onDelete: (id: string) => void;
}

export default function TaskItem({ todo, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 shrink-0 accent-gray-800"
      />
      <span
        className={`flex-1 break-all text-sm ${
          todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 text-xs text-gray-400 hover:text-red-500"
      >
        삭제
      </button>
    </li>
  );
}
