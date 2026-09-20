import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import type { Todo } from './types/todo';

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 via-slate-50 to-indigo-100 px-4 py-8 sm:px-6 sm:py-12">
      <main className="w-full max-w-xl rounded-3xl border border-white bg-white p-6 shadow-2xl sm:p-10">
        <header className="mb-8">
          <p className="mb-3 text-sm font-bold tracking-[0.25em] text-violet-600">
            MY DAILY PLAN
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            오늘의 할 일
          </h1>

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            작은 할 일부터 하나씩 완료해 보세요.
          </p>
        </header>

        <TodoInput onAdd={addTodo} />

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">
              할 일 목록
            </h2>

            <span className="text-sm text-slate-500">
              남은 할 일 {remainingCount}개
            </span>
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>

        {todos.length > 0 && (
          <footer className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-500">
            전체 {todos.length}개 · 완료 {completedCount}개
          </footer>
        )}
      </main>
    </div>
  );
}

export default App;