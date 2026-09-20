import type { Todo } from '../types/todo';
import TaskItem from './TaskItem';

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ todos, onToggle, onDelete }: TaskListProps) {
  if (todos.length === 0) {
    return <p className="text-sm">할 일이 없어요.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}