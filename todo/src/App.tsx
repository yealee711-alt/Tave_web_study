import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import type { Todo } from './types/todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((previousTodos) => [...previousTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id),
    );
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="app">
      <main className="todo-card">
        <header className="todo-header">
          <p className="header-label">MY DAILY PLAN</p>
          <h1>오늘의 할 일</h1>
          <p className="header-description">
            작은 할 일부터 하나씩 완료해 보세요.
          </p>
        </header>

        <TodoInput onAdd={addTodo} />

        <section className="todo-section">
          <div className="todo-summary">
            <h2>할 일 목록</h2>
            <span>남은 할 일 {remainingCount}개</span>
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>

        {todos.length > 0 && (
          <footer className="todo-footer">
            전체 {todos.length}개 · 완료 {completedCount}개
          </footer>
        )}
      </main>
    </div>
  );
}

export default App;