import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Todo } from '../types/todo';
import { deleteTodo, getTodo, updateTodo } from '../api/todos';
import TextInput from '../components/TextInput';

export default function TodoDetail() {
  const { id } = useParams(); // "/todos/3" → id는 "3"
  const navigate = useNavigate();

  // 🌐 서버에서 받아온 할 일 하나
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 수정 모드
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⭐ 수정 모드가 켜지면 입력창에 커서 올리기
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  // ⭐ 주소의 id로 서버에서 할 일 하나 가져오기
  useEffect(() => {
    if (!id) return;

    const fetchTodo = async () => {
      try {
        const data = await getTodo(id); // 없으면 null
        setTodo(data);
      } catch {
        setError('할 일을 불러오지 못했어요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id]); // id가 바뀌면 다시 요청

  if (isLoading) {
    return <p className="py-8 text-center text-sm text-gray-400">불러오는 중...</p>;
  }

  if (error) {
    return <p className="py-8 text-center text-sm text-red-500">{error}</p>;
  }

  // 서버가 404를 준 경우 (없는 할 일)
  if (!todo) {
    return (
      <div className="py-8 text-center text-sm text-gray-500">
        <p className="mb-3">존재하지 않는 할 일이에요 😢</p>
        <Link to="/todos" className="font-semibold text-gray-800 underline">
          목록으로
        </Link>
      </div>
    );
  }

  const handleToggle = async () => {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodo(updated);
    } catch {
      alert('상태를 바꾸지 못했어요.');
    }
  };

  const startEdit = () => {
    setText(todo.text);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (text.trim().length < 2) {
      alert('할 일은 2글자 이상 입력해주세요.');
      inputRef.current?.focus();
      return;
    }
    setIsSaving(true);
    try {
      const updated = await updateTodo(todo.id, { text: text.trim() }); // 🌐 PATCH
      setTodo(updated);
      setIsEditing(false);
    } catch {
      alert('저장하지 못했어요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제할까요?')) return;
    try {
      await deleteTodo(todo.id); // 🌐 DELETE
      navigate('/todos');
    } catch {
      alert('삭제하지 못했어요.');
    }
  };

  const btn = 'rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50';

  // ✏️ 수정 모드
  if (isEditing) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-800">할 일 수정</h2>
        <TextInput ref={inputRef} value={text} onChange={setText} />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {isSaving ? '저장 중...' : '저장'}
          </button>
          <button onClick={() => setIsEditing(false)} className={btn}>
            취소
          </button>
        </div>
      </div>
    );
  }

  // 👀 보기 모드
  return (
    <div className="flex flex-col gap-4">
      <h2 className={`break-all text-lg font-bold ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
        {todo.text}
      </h2>

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" checked={todo.completed} onChange={handleToggle} className="h-4 w-4 accent-gray-800" />
        {todo.completed ? '✅ 완료' : '⏳ 진행 중'}
      </label>

      <div className="flex gap-2">
        <button onClick={startEdit} className={btn}>수정</button>
        <button onClick={handleDelete} className={`${btn} hover:text-red-500`}>삭제</button>
        <Link to="/todos" className={btn}>← 목록으로</Link>
      </div>
    </div>
  );
}
