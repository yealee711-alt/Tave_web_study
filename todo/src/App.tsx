import { useState } from 'react';
import type { Todo } from './types/todo';
import Header from './components/common/Header';
import TextInput from './components/TextInput';
import TaskList from './components/TaskList';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main className="min-h-screen flex justify-center p-8">
      <div className="w-full max-w-md flex flex-col gap-4">
        <Header title="Todo" />
        <TextInput onAdd={addTodo} />
        <TaskList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </main>
  );
}