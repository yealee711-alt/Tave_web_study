import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  type Category,
} from './todoSlice';
import TodoForm from './TodoForm';
import TodoFilter, { type Filter } from './TodoFilter';
import TodoList from './TodoList';

export default function TodoApp() {
  const [filter, setFilter] = useState<Filter>('all');

  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  // 파생 값: 별도 State로 만들지 않고 todos에서 바로 계산
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const emptyMessage =
    todos.length === 0
      ? '등록된 할 일이 없습니다.'
      : '해당하는 할 일이 없습니다.';

  const handleAdd = (text: string, category: Category) => {
    dispatch(addTodo({ text, category }));
  };

  const handleToggle = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (id: string, text: string) => {
    dispatch(editTodo({ id, text }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-extrabold text-gray-800">
        할 일 관리 (Redux)
      </h1>

      <TodoForm onAdd={handleAdd} />

      <TodoFilter filter={filter} onChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        emptyMessage={emptyMessage}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <p className="mt-4 text-right text-xs text-gray-500">
        {remainingCount}개 남음 / 전체 {todos.length}개
      </p>
    </div>
  );
}
