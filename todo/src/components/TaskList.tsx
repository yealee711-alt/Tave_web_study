import type { Todo, Category } from '../types/todo';
import TaskItem from './TaskItem';

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, category: Category) => void;
}

export default function TaskList({ todos, onToggle, onDelete, onEdit }: TaskListProps) {
  if (todos.length === 0) {
    return <p className="text-sm">할 일이 없어요.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}