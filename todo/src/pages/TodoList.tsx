import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TodoFilter, { type Filter } from '../todo/TodoFilter';
import type { Todo } from '../types/todo';
import { deleteTodo, getTodos, updateTodo } from '../api/todos';

// 주소에 이상한 값(?filter=abc)이 들어와도 안전하게 처리하기 위한 목록
const FILTER_VALUES: Filter[] = ['all', 'active', 'completed'];
const isFilter = (value: string | null): value is Filter =>
  FILTER_VALUES.includes(value as Filter);

export default function TodoList() {
  // 🌐 서버에서 받아온 데이터와 상태들
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0); // 바뀌면 다시 불러오기

  // ⭐ 화면이 뜬 다음 서버에서 목록 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch {
        setError('할 일을 불러오지 못했어요. 서버가 켜져 있는지 확인해주세요.');
      } finally {
        setIsLoading(false); // 성공하든 실패하든 로딩 끝
      }
    };

    fetchTodos();
  }, [reloadKey]); // 처음 한 번 + [다시 시도]를 누를 때마다

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  // ✅ 완료 체크: 서버에 PATCH → 응답으로 받은 값으로 화면 갱신
  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch {
      alert('상태를 바꾸지 못했어요.');
    }
  };

  // 🗑️ 삭제: 서버에 DELETE → 화면에서도 빼기
  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제할까요?')) return;
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert('삭제하지 못했어요.');
    }
  };

  // ⭐ 1) 주소에서 조건 읽기  예) /todos?filter=completed&q=리덕스
  const [searchParams, setSearchParams] = useSearchParams();
  const rawFilter = searchParams.get('filter'); // 없으면 null
  const filter: Filter = isFilter(rawFilter) ? rawFilter : 'all';
  const q = searchParams.get('q') ?? ''; // 없으면 빈 글자

  // ⭐ 2) 주소의 조건 하나만 바꾸기 (다른 조건은 그대로 유지)
  const updateParam = (key: string, value: string, defaultValue: string, replace = false) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev); // 기존 조건 복사
        if (value === defaultValue) {
          next.delete(key); // 기본값이면 주소에서 아예 빼기 (주소 깔끔하게)
        } else {
          next.set(key, value);
        }
        return next;
      },
      { replace } // true면 뒤로가기 기록을 쌓지 않음
    );
  };

  // ⭐ 3) 조건에 맞는 것만 골라내기
  const keyword = q.trim().toLowerCase();
  const visibleTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true; // 'all'
    })
    .filter((todo) => todo.text.toLowerCase().includes(keyword));

  const doneCount = todos.filter((todo) => todo.completed).length;

  // ⏳ 로딩 중
  if (isLoading) {
    return <p className="py-8 text-center text-sm text-gray-400">불러오는 중...</p>;
  }

  // ❌ 에러
  if (error) {
    return (
      <div className="py-8 text-center text-sm text-red-500">
        <p className="mb-3">{error}</p>
        <button onClick={handleRetry} className="font-semibold text-gray-800 underline">
          다시 시도
        </button>
      </div>
    );
  }

  // 할 일이 아예 하나도 없을 때
  if (todos.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-gray-400">
        <p className="mb-3">등록된 할 일이 없습니다.</p>
        <Link to="/todos/new" className="font-semibold text-gray-800 underline">
          첫 할 일 추가하기
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* 검색창: 값이 state가 아니라 "주소"에 저장돼요 */}
      <input
        type="search"
        value={q}
        onChange={(e) => updateParam('q', e.target.value, '', true)}
        placeholder="할 일 검색"
        className="mb-3 w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
      />

      {/* 2주차에 만들어둔 필터 버튼 재사용 */}
      <TodoFilter filter={filter} onChange={(value) => updateParam('filter', value, 'all')} />

      <p className="mb-3 text-xs text-gray-400">
        전체 {todos.length} · 완료 {doneCount} · 보이는 항목 {visibleTodos.length}
      </p>

      {/* 조건에 맞는 게 없을 때 */}
      {visibleTodos.length === 0 ? (
        <div className="py-6 text-center text-sm text-gray-400">
          <p className="mb-2">조건에 맞는 할 일이 없어요.</p>
          <button onClick={() => setSearchParams({})} className="font-semibold text-gray-800 underline">
            조건 초기화
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                className="h-4 w-4 shrink-0 cursor-pointer accent-gray-800"
              />

              <Link
                to={`/todos/${todo.id}`}
                className={`flex-1 break-all text-sm ${
                  todo.completed ? 'text-gray-400 line-through' : 'text-gray-800 hover:underline'
                }`}
              >
                {todo.text}
              </Link>

              <button
                onClick={() => handleDelete(todo.id)}
                className="shrink-0 text-xs font-medium text-gray-400 transition-colors hover:text-red-500"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
