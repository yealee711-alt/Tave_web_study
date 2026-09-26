import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { addTodo, toggleTodo, deleteTodo } from './todoSlice';

export default function TodoApp() {
  const [text, setText] = useState('');
  
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    dispatch(addTodo(text.trim()));
    setText('');
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-extrabold text-gray-800">
        할 일 관리 (Redux)
      </h1>
      
      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="새로운 할 일을 입력하세요"
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm outline-none transition-all focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          추가
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
              className="h-4 w-4 shrink-0 cursor-pointer accent-gray-800"
            />
            <span
              className={`flex-1 break-all text-sm transition-all ${
                todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="shrink-0 text-xs font-medium text-gray-400 transition-colors hover:text-red-500"
            >
              삭제
            </button>
          </li>
        ))}
        
        {todos.length === 0 && (
          <li className="py-4 text-center text-sm text-gray-400">
            등록된 할 일이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}