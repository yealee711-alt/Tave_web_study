import type { Todo } from './todoSlice';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  emptyMessage: string;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  emptyMessage,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {todos.length === 0 && (
        <li className="py-4 text-center text-sm text-gray-400">
          {emptyMessage}
        </li>
      )}
    </ul>
  );
}
