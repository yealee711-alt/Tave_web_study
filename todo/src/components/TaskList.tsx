import { useMemo, useState } from 'react';
import type { Todo, Category } from '../types/todo';
import TaskItem from './TaskItem';

type StatusFilter = 'all' | 'active' | 'completed';

const STATUS_LABEL: Record<StatusFilter, string> = {
  all: '전체',
  active: '진행중',
  completed: '완료',
};

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onCategoryChange: (id: string, category: Category) => void;
}

export default function TaskList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onCategoryChange,
}: TaskListProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filtered = useMemo(() => {
    if (statusFilter === 'active') return todos.filter((t) => !t.completed);
    if (statusFilter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, statusFilter]);

  if (todos.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-gray-400">
        할 일이 없습니다. 새로운 할 일을 추가해보세요.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-3 flex gap-1 rounded-lg bg-gray-100 p-1 text-xs font-medium">
        {(Object.keys(STATUS_LABEL) as StatusFilter[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatusFilter(key)}
            className={`flex-1 rounded-md py-1.5 transition-colors ${
              statusFilter === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {STATUS_LABEL[key]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">해당하는 할 일이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((todo) => (
            <TaskItem
              key={todo.id}
              todo={todo}
              allTodos={todos}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onCategoryChange={onCategoryChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
