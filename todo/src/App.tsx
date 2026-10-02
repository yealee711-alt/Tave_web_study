import { useState } from 'react';
import type { Todo, Category } from './types/todo';
import Header from './components/common/Header';
import TextInput from './components/TextInput';
import TaskList from './components/TaskList';
import CategoryFilter from './components/CategoryFilter';
import type { Filter } from './components/CategoryFilter';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('전체');

  const addTodo = (text: string, category: Category) => {
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false, category }]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string, category: Category) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text, category } : todo))
    );
  };

  const visibleTodos = filter === '전체' ? todos : todos.filter((t) => t.category === filter);

  return (
    <main className="min-h-screen flex justify-center p-8">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <Header title="Todo" />
        <TextInput onAdd={addTodo} />
        <CategoryFilter selected={filter} onSelect={setFilter} />
        <TaskList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </main>
  );
}