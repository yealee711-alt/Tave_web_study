import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span className="custom-checkbox">✓</span>
        <span className="todo-text">{todo.text}</span>
      </label>

      <button
        className="delete-button"
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