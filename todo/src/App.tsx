import { useState } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import TaskList from './components/TaskList';
import type { Todo } from './types/todo';

function App() {
  // 할 일 목록 전체를 관리하는 상태 (최상위 컴포넌트에서 관리 후 props로 전달)
  const [todos, setTodos] = useState<Todo[]>([]);

  // 새 할 일 추가
  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // 완료 여부 토글
  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  // 할 일 삭제
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-md px-4">
      <Header />
      <TextInput onAdd={handleAdd} />
      <TaskList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
