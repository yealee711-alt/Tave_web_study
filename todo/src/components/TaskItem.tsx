import type { Todo } from '../types/todo';
import Button from './common/Button';

interface TaskItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ todo, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center text-[16px] gap-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="size-4 shrink-0"
      />
      <span className={`flex-1 text-left leading-none ${todo.completed ? 'line-through' : ''}`}>
        {todo.text}
      </span>
      <Button onClick={() => onDelete(todo.id)}>삭제</Button>
    </li>
  );
}