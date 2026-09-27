import type { Todo, TodoCategory } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    text: string,
    category: TodoCategory,
  ) => void;
  emptyMessage?: string;
}

function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  emptyMessage = '아직 등록된 할 일이 없어요.',
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-violet-200 bg-violet-50 px-6 py-10 text-center">
        <span className="mb-3 text-4xl">📝</span>

        <p className="text-sm text-slate-500">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
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

export default TodoList;