import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import {
  TODO_CATEGORIES,
  type Todo,
  type TodoCategory,
} from './types/todo';

type CategoryFilter = '전체' | TodoCategory;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('전체');

  const addTodo = (text: string, category: TodoCategory) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      category,
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

  const editTodo = (
    id: string,
    text: string,
    category: TodoCategory,
  ) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, text, category } : todo,
      ),
    );
  };

  const completedCount = todos.filter(
    (todo) => todo.completed,
  ).length;

  const remainingCount = todos.length - completedCount;

  const filteredTodos =
    selectedCategory === '전체'
      ? todos
      : todos.filter(
          (todo) => todo.category === selectedCategory,
        );

  const categoryFilters: CategoryFilter[] = [
    '전체',
    ...TODO_CATEGORIES,
  ];

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

          <div
            className="mb-5 flex flex-wrap gap-2"
            aria-label="카테고리 필터"
          >
            {categoryFilters.map((category) => (
              <button
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
                }`}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            emptyMessage={
              selectedCategory === '전체'
                ? '아직 등록된 할 일이 없어요.'
                : `${selectedCategory} 카테고리에 등록된 할 일이 없어요.`
            }
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